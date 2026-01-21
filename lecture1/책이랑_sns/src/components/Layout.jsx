// 공통 레이아웃 - 상단바, 하단바
import { useState, useEffect } from 'react'
import { useNavigate, useLocation, Outlet } from 'react-router-dom'
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  BottomNavigation,
  BottomNavigationAction,
  Paper,
  InputBase,
  Dialog,
  DialogTitle,
  DialogContent,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Divider,
  CircularProgress,
} from '@mui/material'
import {
  Search as SearchIcon,
  Home as HomeIcon,
  Category as CategoryIcon,
  Person as PersonIcon,
  MenuBook as MenuBookIcon,
  Book as BookIcon,
  RateReview as ReviewIcon,
} from '@mui/icons-material'
import { useAuth } from '../context/AuthContext'
import { supabase } from '../lib/supabase'

export default function Layout() {
  const navigate = useNavigate()
  const location = useLocation()
  const { user } = useAuth()
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState({ books: [], posts: [] })
  const [searching, setSearching] = useState(false)

  // 검색 실행
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults({ books: [], posts: [] })
      return
    }

    const timer = setTimeout(() => {
      performSearch(searchQuery.trim())
    }, 300) // 300ms 디바운스

    return () => clearTimeout(timer)
  }, [searchQuery])

  const performSearch = async (query) => {
    setSearching(true)

    // 책 검색
    const { data: books } = await supabase
      .from('books')
      .select('*')
      .or(`title.ilike.%${query}%,author.ilike.%${query}%`)
      .limit(5)

    // 리뷰 검색
    const { data: posts } = await supabase
      .from('posts')
      .select(`
        *,
        users:author_id (nickname)
      `)
      .or(`title.ilike.%${query}%,content.ilike.%${query}%,book_title.ilike.%${query}%`)
      .limit(5)

    setSearchResults({
      books: books || [],
      posts: posts || []
    })
    setSearching(false)
  }

  const handleSearchClose = () => {
    setSearchOpen(false)
    setSearchQuery('')
    setSearchResults({ books: [], posts: [] })
  }

  const handleBookClick = (book) => {
    handleSearchClose()
    navigate('/category')
  }

  const handlePostClick = (postId) => {
    handleSearchClose()
    navigate(`/post/${postId}`)
  }

  // 현재 경로에 따른 하단 네비게이션 값
  const getNavValue = () => {
    const path = location.pathname
    if (path === '/' || path === '/home') return 0
    if (path === '/category') return 1
    if (path === '/mypage') return 2
    return 0
  }

  const handleNavChange = (event, newValue) => {
    switch (newValue) {
      case 0:
        navigate('/home')
        break
      case 1:
        navigate('/category')
        break
      case 2:
        if (user) {
          navigate('/mypage')
        } else {
          navigate('/login')
        }
        break
    }
  }

  const hasResults = searchResults.books.length > 0 || searchResults.posts.length > 0

  return (
    <Box className="app-container" sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* 상단바 */}
      <AppBar
        position="fixed"
        sx={{
          bgcolor: 'background.paper',
          color: 'text.primary',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          width: '100%',
          maxWidth: '430px',
          left: '50%',
          transform: 'translateX(-50%)',
          '@media (max-width: 430px)': {
            left: 0,
            transform: 'none',
            maxWidth: '100%',
          }
        }}
      >
        <Toolbar>
          {/* 로고 */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer',
              flexGrow: 1
            }}
            onClick={() => navigate('/home')}
          >
            <MenuBookIcon sx={{ color: 'primary.main', mr: 1, fontSize: 28 }} />
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                color: 'primary.main',
                fontFamily: '"Pretendard", sans-serif'
              }}
            >
              책이랑
            </Typography>
          </Box>

          {/* 검색 버튼 */}
          <IconButton
            onClick={() => setSearchOpen(true)}
            sx={{ color: 'text.secondary' }}
          >
            <SearchIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* 검색 다이얼로그 */}
      <Dialog
        open={searchOpen}
        onClose={handleSearchClose}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>검색</DialogTitle>
        <DialogContent>
          <InputBase
            autoFocus
            placeholder="책 제목, 작가, 리뷰 내용을 검색하세요"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{
              width: '100%',
              p: 1.5,
              border: '1px solid',
              borderColor: 'grey.300',
              borderRadius: 2,
              mb: 2
            }}
          />

          {/* 로딩 */}
          {searching && (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 3 }}>
              <CircularProgress size={24} />
            </Box>
          )}

          {/* 검색 결과 */}
          {!searching && searchQuery && (
            <>
              {/* 책 검색 결과 */}
              {searchResults.books.length > 0 && (
                <>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1, color: 'primary.main' }}>
                    책 ({searchResults.books.length})
                  </Typography>
                  <List disablePadding>
                    {searchResults.books.map((book) => (
                      <ListItem
                        key={book.id}
                        button
                        onClick={() => handleBookClick(book)}
                        sx={{ borderRadius: 2, mb: 0.5 }}
                      >
                        <ListItemAvatar>
                          <Avatar
                            variant="rounded"
                            src={book.cover_image}
                            sx={{ width: 40, height: 50 }}
                          >
                            <BookIcon />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={book.title}
                          secondary={`${book.author} · ${book.category}`}
                        />
                      </ListItem>
                    ))}
                  </List>
                  <Divider sx={{ my: 2 }} />
                </>
              )}

              {/* 리뷰 검색 결과 */}
              {searchResults.posts.length > 0 && (
                <>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1, color: 'secondary.main' }}>
                    리뷰 ({searchResults.posts.length})
                  </Typography>
                  <List disablePadding>
                    {searchResults.posts.map((post) => (
                      <ListItem
                        key={post.id}
                        button
                        onClick={() => handlePostClick(post.id)}
                        sx={{ borderRadius: 2, mb: 0.5 }}
                      >
                        <ListItemAvatar>
                          <Avatar sx={{ bgcolor: 'secondary.light' }}>
                            <ReviewIcon />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={post.title}
                          secondary={`${post.users?.nickname || '익명'} · ${post.book_title || '책 없음'}`}
                        />
                      </ListItem>
                    ))}
                  </List>
                </>
              )}

              {/* 검색 결과 없음 */}
              {!hasResults && (
                <Box sx={{ textAlign: 'center', py: 4 }}>
                  <Typography variant="body2" color="text.secondary">
                    "{searchQuery}"에 대한 검색 결과가 없습니다
                  </Typography>
                </Box>
              )}
            </>
          )}

          {/* 초기 상태 */}
          {!searching && !searchQuery && (
            <List>
              <ListItem button onClick={() => { handleSearchClose(); navigate('/category'); }}>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: 'primary.light' }}>
                    <CategoryIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="카테고리에서 찾기" secondary="장르별로 책을 둘러보세요" />
              </ListItem>
            </List>
          )}
        </DialogContent>
      </Dialog>

      {/* 메인 컨텐츠 */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          pt: '64px', // AppBar 높이
          pb: '56px', // BottomNavigation 높이
          bgcolor: 'background.default',
          minHeight: '100vh'
        }}
      >
        <Outlet />
      </Box>

      {/* 하단바 */}
      <Paper
        sx={{
          position: 'fixed',
          bottom: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '100%',
          maxWidth: '430px',
          zIndex: 1000,
          borderRadius: 0,
          '@media (max-width: 430px)': {
            left: 0,
            transform: 'none',
          }
        }}
        elevation={3}
      >
        <BottomNavigation
          value={getNavValue()}
          onChange={handleNavChange}
          showLabels
          sx={{
            '& .Mui-selected': {
              color: 'primary.main',
            },
          }}
        >
          <BottomNavigationAction
            label="홈"
            icon={<HomeIcon />}
          />
          <BottomNavigationAction
            label="카테고리"
            icon={<CategoryIcon />}
          />
          <BottomNavigationAction
            label="내 서재"
            icon={<PersonIcon />}
          />
        </BottomNavigation>
      </Paper>
    </Box>
  )
}
