// 메인 홈 페이지 - 책 리뷰 피드
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Box,
  Container,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  IconButton,
  Chip,
  Fab,
  Skeleton,
  Paper,
  Button,
} from '@mui/material'
import {
  Favorite,
  FavoriteBorder,
  ChatBubbleOutline,
  Add as AddIcon,
  AutoStories,
  Psychology,
  MenuBook,
  Palette,
  HistoryEdu,
} from '@mui/icons-material'
import { supabase } from '../lib/supabase'
import { useAuth } from '../context/AuthContext'

export default function Home() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [likedPosts, setLikedPosts] = useState(new Set())

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    const { data, error } = await supabase
      .from('posts')
      .select(`
        *,
        users:author_id (nickname, username)
      `)
      .order('created_at', { ascending: false })

    if (!error && data) {
      setPosts(data)
    }
    setLoading(false)
  }

  const handleLike = async (postId) => {
    if (likedPosts.has(postId)) {
      setLikedPosts(prev => {
        const newSet = new Set(prev)
        newSet.delete(postId)
        return newSet
      })
      await supabase
        .from('posts')
        .update({ likes_count: posts.find(p => p.id === postId).likes_count - 1 })
        .eq('id', postId)
    } else {
      setLikedPosts(prev => new Set(prev).add(postId))
      await supabase
        .from('posts')
        .update({ likes_count: (posts.find(p => p.id === postId).likes_count || 0) + 1 })
        .eq('id', postId)
    }
    fetchPosts()
  }

  // 추천 카테고리 데이터
  const recommendations = [
    { icon: <AutoStories />, title: '독서 입문자', desc: '처음 시작하는 독서', category: 'all' },
    { icon: <Psychology />, title: '추리 마니아', desc: '손에 땀 쥐는 추리물', category: '추리/SF' },
    { icon: <MenuBook />, title: '인생 에세이', desc: '마음을 울리는 글', category: '에세이' },
    { icon: <Palette />, title: '예술 감상', desc: '아름다움을 담은 책', category: '예술' },
    { icon: <HistoryEdu />, title: '역사 탐험', desc: '과거에서 배우는 지혜', category: '역사' },
  ]

  return (
    <Box sx={{ pb: 2 }}>
      <Container maxWidth="sm">
        {/* 목적별 책 추천 섹션 */}
        <Paper sx={{ p: 2, mb: 2, borderRadius: 3 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
            어떤 책을 찾으시나요?
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, overflowX: 'auto', pb: 1 }}>
            {recommendations.map((item, idx) => (
              <Card
                key={idx}
                sx={{
                  minWidth: 140,
                  cursor: 'pointer',
                  border: '1px solid',
                  borderColor: 'grey.200',
                  boxShadow: 'none',
                  '&:hover': { borderColor: 'primary.main' }
                }}
                onClick={() => navigate(`/category?cat=${encodeURIComponent(item.category)}`)}
              >
                <CardContent sx={{ textAlign: 'center', py: 2 }}>
                  <Box sx={{ color: 'primary.main', mb: 1 }}>{item.icon}</Box>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {item.title}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {item.desc}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Paper>

        {/* 독서 성향 테스트 배너 */}
        <Paper
          sx={{
            p: 3,
            mb: 3,
            borderRadius: 3,
            background: 'linear-gradient(135deg, #2D5A45 0%, #4A7C59 100%)',
            color: 'white',
            cursor: 'pointer',
          }}
          onClick={() => alert('독서 성향 테스트는 준비 중입니다!')}
        >
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
            나에게 딱 맞는 책은?
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.9, mb: 2 }}>
            간단한 테스트로 당신에게 어울리는 책을 추천받아 보세요!
          </Typography>
          <Button
            variant="contained"
            size="small"
            sx={{
              bgcolor: 'white',
              color: 'primary.main',
              '&:hover': { bgcolor: 'grey.100' }
            }}
          >
            테스트 시작하기
          </Button>
        </Paper>

        {/* 피드 타이틀 */}
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
          독서 리뷰
        </Typography>

        {/* 리뷰 피드 */}
        {loading ? (
          [...Array(3)].map((_, idx) => (
            <Card key={idx} sx={{ mb: 2 }}>
              <Skeleton variant="rectangular" height={200} />
              <CardContent>
                <Skeleton width="60%" />
                <Skeleton width="80%" />
              </CardContent>
            </Card>
          ))
        ) : posts.length === 0 ? (
          <Paper sx={{ p: 4, textAlign: 'center', borderRadius: 3 }}>
            <MenuBook sx={{ fontSize: 60, color: 'grey.400', mb: 2 }} />
            <Typography variant="h6" color="text.secondary">
              아직 리뷰가 없어요
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              첫 번째 리뷰를 작성해 보세요!
            </Typography>
            <Button
              variant="contained"
              onClick={() => user ? navigate('/write') : navigate('/login')}
            >
              리뷰 작성하기
            </Button>
          </Paper>
        ) : (
          posts.map((post) => (
            <Card
              key={post.id}
              sx={{ mb: 2, cursor: 'pointer' }}
              onClick={() => navigate(`/post/${post.id}`)}
            >
              {post.image_url && (
                <CardMedia
                  component="img"
                  height="200"
                  image={post.image_url}
                  alt={post.title}
                  sx={{ objectFit: 'cover' }}
                />
              )}
              <CardContent>
                {post.book_title && (
                  <Chip
                    label={post.book_title}
                    size="small"
                    sx={{ mb: 1, bgcolor: 'primary.light', color: 'white' }}
                  />
                )}
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                  {post.title}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                  }}
                >
                  {post.content}
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 1 }}>
                  {post.hashtags?.map((tag, idx) => (
                    <Chip
                      key={idx}
                      label={`#${tag}`}
                      size="small"
                      variant="outlined"
                      sx={{ fontSize: '0.75rem' }}
                    />
                  ))}
                </Box>
                <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                  {post.users?.nickname || '익명'} · {new Date(post.created_at).toLocaleDateString('ko-KR')}
                </Typography>
              </CardContent>
              <CardActions sx={{ px: 2, pb: 2 }}>
                <IconButton
                  size="small"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleLike(post.id)
                  }}
                  color={likedPosts.has(post.id) ? 'error' : 'default'}
                >
                  {likedPosts.has(post.id) ? <Favorite /> : <FavoriteBorder />}
                </IconButton>
                <Typography variant="body2" color="text.secondary">
                  {post.likes_count || 0}
                </Typography>
                <IconButton size="small" sx={{ ml: 1 }}>
                  <ChatBubbleOutline />
                </IconButton>
              </CardActions>
            </Card>
          ))
        )}
      </Container>

      {/* 글쓰기 FAB */}
      <Fab
        color="primary"
        sx={{
          position: 'fixed',
          bottom: 72,
          right: 16,
        }}
        onClick={() => user ? navigate('/write') : navigate('/login')}
      >
        <AddIcon />
      </Fab>
    </Box>
  )
}
