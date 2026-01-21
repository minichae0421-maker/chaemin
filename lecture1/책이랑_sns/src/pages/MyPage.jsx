// 마이페이지 (내 서재)
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Box,
  Container,
  Typography,
  Paper,
  Avatar,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Card,
  CardContent,
  LinearProgress,
  Chip,
} from '@mui/material'
import {
  MenuBook,
  RateReview,
  ShoppingBag,
  Logout,
  ChevronRight,
  AutoStories,
} from '@mui/icons-material'
import { supabase } from '../lib/supabase'
import { useAuth } from '../context/AuthContext'

export default function MyPage() {
  const navigate = useNavigate()
  const { user, logout } = useAuth()
  const [readingBooks, setReadingBooks] = useState([])
  const [myPosts, setMyPosts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user) {
      fetchUserData()
    } else {
      setLoading(false)
    }
  }, [user])

  const fetchUserData = async () => {
    // 독서 중인 책 조회
    const { data: books } = await supabase
      .from('user_books')
      .select(`
        *,
        books (title, cover_image, author)
      `)
      .eq('user_id', user.id)
      .eq('status', 'reading')

    if (books) {
      setReadingBooks(books)
    }

    // 내가 쓴 리뷰 조회
    const { data: posts } = await supabase
      .from('posts')
      .select('*')
      .eq('author_id', user.id)
      .order('created_at', { ascending: false })
      .limit(5)

    if (posts) {
      setMyPosts(posts)
    }

    setLoading(false)
  }

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  if (!user) {
    return (
      <Container maxWidth="sm" sx={{ py: 4 }}>
        <Paper sx={{ p: 4, textAlign: 'center', borderRadius: 3 }}>
          <AutoStories sx={{ fontSize: 80, color: 'primary.main', mb: 2 }} />
          <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
            내 서재
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            로그인하고 나만의 서재를 만들어보세요
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate('/login')}
            sx={{ mr: 1 }}
          >
            로그인
          </Button>
          <Button
            variant="outlined"
            size="large"
            onClick={() => navigate('/signup')}
          >
            회원가입
          </Button>
        </Paper>
      </Container>
    )
  }

  return (
    <Box sx={{ pb: 4 }}>
      <Container maxWidth="sm">
        {/* 프로필 섹션 */}
        <Paper sx={{ p: 3, mb: 2, borderRadius: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Avatar
              sx={{
                width: 64,
                height: 64,
                bgcolor: 'primary.main',
                fontSize: 24,
                mr: 2,
              }}
            >
              {user.nickname?.[0] || user.username?.[0] || '?'}
            </Avatar>
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                {user.nickname || user.display_name || user.username}
              </Typography>
              {user.email && (
                <Typography variant="body2" color="text.secondary">
                  {user.email}
                </Typography>
              )}
              <Chip
                label="독서 애호가"
                size="small"
                color="primary"
                variant="outlined"
                sx={{ mt: 0.5 }}
              />
            </Box>
          </Box>
        </Paper>

        {/* 독서 중인 책 */}
        <Paper sx={{ p: 2, mb: 2, borderRadius: 3 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
            <MenuBook sx={{ verticalAlign: 'middle', mr: 1, color: 'primary.main' }} />
            읽고 있는 책
          </Typography>

          {readingBooks.length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 3 }}>
              <Typography variant="body2" color="text.secondary">
                아직 읽고 있는 책이 없어요
              </Typography>
              <Button
                size="small"
                onClick={() => navigate('/category')}
                sx={{ mt: 1 }}
              >
                책 둘러보기
              </Button>
            </Box>
          ) : (
            readingBooks.map((item) => (
              <Card
                key={item.id}
                sx={{ mb: 1, boxShadow: 'none', border: '1px solid', borderColor: 'grey.200' }}
              >
                <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
                  <Box
                    component="img"
                    src={item.books?.cover_image || 'https://via.placeholder.com/60x80'}
                    alt={item.books?.title}
                    sx={{ width: 50, height: 70, objectFit: 'cover', borderRadius: 1, mr: 2 }}
                  />
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="body1" sx={{ fontWeight: 600 }}>
                      {item.books?.title}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {item.books?.author}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                      <LinearProgress
                        variant="determinate"
                        value={item.progress || 0}
                        sx={{ flexGrow: 1, mr: 1, height: 6, borderRadius: 3 }}
                      />
                      <Typography variant="caption" color="text.secondary">
                        {item.progress || 0}%
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            ))
          )}
        </Paper>

        {/* 메뉴 리스트 */}
        <Paper sx={{ borderRadius: 3 }}>
          <List disablePadding>
            <ListItem
              button
              onClick={() => navigate('/category')}
              sx={{ py: 2 }}
            >
              <ListItemIcon>
                <ShoppingBag color="primary" />
              </ListItemIcon>
              <ListItemText
                primary="구매한 책"
                secondary="내가 구매한 책 목록"
              />
              <ChevronRight color="action" />
            </ListItem>

            <Divider />

            <ListItem
              button
              onClick={() => {
                // 내 리뷰 보기
                alert('내가 쓴 리뷰 기능은 준비 중입니다!')
              }}
              sx={{ py: 2 }}
            >
              <ListItemIcon>
                <RateReview color="primary" />
              </ListItemIcon>
              <ListItemText
                primary="내가 쓴 리뷰"
                secondary={`${myPosts.length}개의 리뷰`}
              />
              <ChevronRight color="action" />
            </ListItem>

            <Divider />

            <ListItem
              button
              onClick={handleLogout}
              sx={{ py: 2 }}
            >
              <ListItemIcon>
                <Logout color="error" />
              </ListItemIcon>
              <ListItemText
                primary="로그아웃"
                primaryTypographyProps={{ color: 'error' }}
              />
            </ListItem>
          </List>
        </Paper>

        {/* 최근 작성한 리뷰 */}
        {myPosts.length > 0 && (
          <Paper sx={{ p: 2, mt: 2, borderRadius: 3 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
              최근 작성한 리뷰
            </Typography>
            {myPosts.slice(0, 3).map((post) => (
              <Card
                key={post.id}
                sx={{
                  mb: 1,
                  boxShadow: 'none',
                  border: '1px solid',
                  borderColor: 'grey.200',
                  cursor: 'pointer',
                }}
                onClick={() => navigate(`/post/${post.id}`)}
              >
                <CardContent sx={{ py: 1.5 }}>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {post.title}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {new Date(post.created_at).toLocaleDateString('ko-KR')}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Paper>
        )}
      </Container>
    </Box>
  )
}
