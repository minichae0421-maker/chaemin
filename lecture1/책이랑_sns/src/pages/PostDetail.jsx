// 게시물 상세 페이지
import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  Box,
  Container,
  Typography,
  Paper,
  IconButton,
  Chip,
  Divider,
  TextField,
  Button,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Skeleton,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material'
import {
  ArrowBack,
  Favorite,
  FavoriteBorder,
  PlayArrow,
  Send,
  Delete,
} from '@mui/icons-material'
import { supabase } from '../lib/supabase'
import { useAuth } from '../context/AuthContext'

export default function PostDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()
  const [post, setPost] = useState(null)
  const [comments, setComments] = useState([])
  const [newComment, setNewComment] = useState('')
  const [loading, setLoading] = useState(true)
  const [liked, setLiked] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    fetchPost()
    fetchComments()
  }, [id])

  const fetchPost = async () => {
    const { data, error } = await supabase
      .from('posts')
      .select(`
        *,
        users:author_id (nickname, username)
      `)
      .eq('id', id)
      .single()

    if (!error && data) {
      setPost(data)
    }
    setLoading(false)
  }

  const fetchComments = async () => {
    const { data, error } = await supabase
      .from('comments')
      .select(`
        *,
        users:author_id (nickname, username)
      `)
      .eq('post_id', id)
      .order('created_at', { ascending: true })

    if (!error && data) {
      setComments(data)
    }
  }

  const handleLike = async () => {
    if (!post) return

    const newLikeCount = liked ? (post.likes_count || 1) - 1 : (post.likes_count || 0) + 1
    setLiked(!liked)
    setPost({ ...post, likes_count: newLikeCount })

    await supabase
      .from('posts')
      .update({ likes_count: newLikeCount })
      .eq('id', id)
  }

  const handleSubmitComment = async () => {
    if (!newComment.trim()) return
    if (!user) {
      alert('로그인이 필요합니다.')
      navigate('/login')
      return
    }

    setSubmitting(true)

    const { error } = await supabase
      .from('comments')
      .insert([{
        post_id: parseInt(id),
        author_id: user.id,
        content: newComment.trim(),
      }])

    if (!error) {
      setNewComment('')
      fetchComments()
    }
    setSubmitting(false)
  }

  // 게시물 삭제 핸들러
  const handleDeletePost = async () => {
    setDeleting(true)

    // 먼저 관련 댓글 삭제
    await supabase
      .from('comments')
      .delete()
      .eq('post_id', id)

    // 게시물 삭제
    const { error } = await supabase
      .from('posts')
      .delete()
      .eq('id', id)

    setDeleting(false)
    setDeleteDialogOpen(false)

    if (!error) {
      navigate('/home', { replace: true })
    } else {
      alert('삭제에 실패했습니다.')
    }
  }

  // 본인 게시물인지 확인
  const isMyPost = user && post && post.author_id === user.id

  if (loading) {
    return (
      <Container maxWidth="sm" sx={{ py: 2 }}>
        <Skeleton variant="rectangular" height={250} sx={{ borderRadius: 2, mb: 2 }} />
        <Skeleton width="60%" height={40} />
        <Skeleton width="80%" />
        <Skeleton width="80%" />
      </Container>
    )
  }

  if (!post) {
    return (
      <Container maxWidth="sm" sx={{ py: 4 }}>
        <Alert severity="error">게시물을 찾을 수 없습니다.</Alert>
        <Button onClick={() => navigate('/home')} sx={{ mt: 2 }}>
          홈으로 돌아가기
        </Button>
      </Container>
    )
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      {/* 헤더 */}
      <Paper
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1100,
          borderRadius: 0,
        }}
        elevation={1}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', p: 1 }}>
          <IconButton onClick={() => navigate(-1)}>
            <ArrowBack />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 600 }}>
            리뷰 상세
          </Typography>
          {isMyPost && (
            <IconButton
              onClick={() => setDeleteDialogOpen(true)}
              sx={{ color: 'error.main' }}
            >
              <Delete />
            </IconButton>
          )}
        </Box>
      </Paper>

      {/* 삭제 확인 다이얼로그 */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle>리뷰 삭제</DialogTitle>
        <DialogContent>
          <DialogContentText>
            이 리뷰를 삭제하시겠습니까? 삭제된 리뷰는 복구할 수 없습니다.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)} disabled={deleting}>
            취소
          </Button>
          <Button
            onClick={handleDeletePost}
            color="error"
            variant="contained"
            disabled={deleting}
          >
            {deleting ? '삭제 중...' : '삭제'}
          </Button>
        </DialogActions>
      </Dialog>

      <Container maxWidth="sm" sx={{ pt: 8, pb: 10 }}>
        {/* 책 표지 이미지 */}
        {post.image_url && (
          <Box
            sx={{
              width: '100%',
              height: 250,
              borderRadius: 3,
              overflow: 'hidden',
              mb: 2,
            }}
          >
            <img
              src={post.image_url}
              alt={post.title}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
          </Box>
        )}

        {/* 책 제목 & 독서 시작 버튼 */}
        {post.book_title && (
          <Paper sx={{ p: 2, mb: 2, borderRadius: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Box>
                <Typography variant="subtitle2" color="text.secondary">
                  리뷰한 책
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  {post.book_title}
                </Typography>
              </Box>
              <Button
                variant="contained"
                startIcon={<PlayArrow />}
                size="small"
                onClick={() => alert('독서 시작 기능은 준비 중입니다!')}
              >
                독서 시작
              </Button>
            </Box>
          </Paper>
        )}

        {/* 리뷰 내용 */}
        <Paper sx={{ p: 3, mb: 2, borderRadius: 3 }}>
          <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
            {post.title}
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Avatar sx={{ width: 32, height: 32, mr: 1, bgcolor: 'primary.main' }}>
              {post.users?.nickname?.[0] || '?'}
            </Avatar>
            <Typography variant="body2" color="text.secondary">
              {post.users?.nickname || '익명'} · {new Date(post.created_at).toLocaleDateString('ko-KR')}
            </Typography>
          </Box>

          <Typography variant="body1" sx={{ lineHeight: 1.8, whiteSpace: 'pre-wrap' }}>
            {post.content}
          </Typography>

          {/* 해시태그 */}
          {post.hashtags && post.hashtags.length > 0 && (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 2 }}>
              {post.hashtags.map((tag, idx) => (
                <Chip
                  key={idx}
                  label={`#${tag}`}
                  size="small"
                  variant="outlined"
                  color="primary"
                />
              ))}
            </Box>
          )}

          {/* 좋아요 */}
          <Box sx={{ display: 'flex', alignItems: 'center', mt: 3 }}>
            <IconButton onClick={handleLike} color={liked ? 'error' : 'default'}>
              {liked ? <Favorite /> : <FavoriteBorder />}
            </IconButton>
            <Typography variant="body2" color="text.secondary">
              {post.likes_count || 0}명이 좋아합니다
            </Typography>
          </Box>
        </Paper>

        {/* 댓글 섹션 */}
        <Paper sx={{ p: 2, borderRadius: 3 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
            댓글 {comments.length}개
          </Typography>

          <Divider sx={{ mb: 2 }} />

          {/* 댓글 목록 */}
          <List disablePadding>
            {comments.length === 0 ? (
              <Typography variant="body2" color="text.secondary" sx={{ py: 2, textAlign: 'center' }}>
                아직 댓글이 없습니다. 첫 번째 댓글을 남겨보세요!
              </Typography>
            ) : (
              comments.map((comment) => (
                <ListItem key={comment.id} alignItems="flex-start" sx={{ px: 0 }}>
                  <ListItemAvatar>
                    <Avatar sx={{ width: 36, height: 36, bgcolor: 'secondary.main' }}>
                      {comment.users?.nickname?.[0] || '?'}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        {comment.users?.nickname || '익명'}
                        <Typography
                          component="span"
                          variant="caption"
                          color="text.secondary"
                          sx={{ ml: 1 }}
                        >
                          {new Date(comment.created_at).toLocaleDateString('ko-KR')}
                        </Typography>
                      </Typography>
                    }
                    secondary={comment.content}
                  />
                </ListItem>
              ))
            )}
          </List>
        </Paper>
      </Container>

      {/* 댓글 입력 */}
      <Paper
        sx={{
          position: 'fixed',
          bottom: 56,
          left: 0,
          right: 0,
          p: 2,
          borderRadius: 0,
          borderTop: '1px solid',
          borderColor: 'grey.200',
        }}
        elevation={3}
      >
        <Box sx={{ display: 'flex', gap: 1, maxWidth: 'sm', mx: 'auto' }}>
          <TextField
            fullWidth
            size="small"
            placeholder={user ? "댓글을 입력하세요" : "로그인 후 댓글을 작성할 수 있습니다"}
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSubmitComment()}
            disabled={!user}
          />
          <IconButton
            color="primary"
            onClick={handleSubmitComment}
            disabled={!newComment.trim() || submitting}
          >
            <Send />
          </IconButton>
        </Box>
      </Paper>
    </Box>
  )
}
