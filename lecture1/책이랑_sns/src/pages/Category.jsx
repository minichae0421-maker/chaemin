// 카테고리 페이지 - 책 목록
import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Chip,
  Tabs,
  Tab,
  Skeleton,
  Button,
} from '@mui/material'
import {
  MenuBook,
  Psychology,
  Science,
  SelfImprovement,
  LocalLibrary,
  Palette,
  HistoryEdu,
} from '@mui/icons-material'
import { supabase } from '../lib/supabase'
import { useAuth } from '../context/AuthContext'

// 카테고리 정의
const categories = [
  { id: 'all', label: '전체', icon: <LocalLibrary /> },
  { id: '문학', label: '문학', icon: <MenuBook /> },
  { id: '추리/SF', label: '추리/SF', icon: <Psychology /> },
  { id: '과학', label: '과학', icon: <Science /> },
  { id: '자기계발', label: '자기계발', icon: <SelfImprovement /> },
  { id: '에세이', label: '에세이', icon: <MenuBook /> },
  { id: '예술', label: '예술', icon: <Palette /> },
  { id: '역사', label: '역사', icon: <HistoryEdu /> },
]

export default function Category() {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const { user } = useAuth()
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(true)

  // URL 파라미터에서 카테고리 가져오기
  const categoryFromUrl = searchParams.get('cat') || 'all'
  const [selectedCategory, setSelectedCategory] = useState(categoryFromUrl)

  // URL 파라미터 변경 시 카테고리 업데이트
  useEffect(() => {
    const cat = searchParams.get('cat') || 'all'
    setSelectedCategory(cat)
  }, [searchParams])

  useEffect(() => {
    fetchBooks()
  }, [selectedCategory])

  const fetchBooks = async () => {
    setLoading(true)
    let query = supabase.from('books').select('*')

    if (selectedCategory !== 'all') {
      query = query.eq('category', selectedCategory)
    }

    const { data, error } = await query.order('created_at', { ascending: false })

    if (!error && data) {
      setBooks(data)
    }
    setLoading(false)
  }

  const handleStartReading = async (book) => {
    if (!user) {
      navigate('/login')
      return
    }

    // user_books 테이블에 추가
    await supabase
      .from('user_books')
      .upsert({
        user_id: user.id,
        book_id: book.id,
        status: 'reading',
        progress: 0,
      })

    alert(`"${book.title}" 독서를 시작합니다!`)
  }

  return (
    <Box sx={{ pb: 4 }}>
      <Container maxWidth="sm">
        {/* 카테고리 탭 */}
        <Box sx={{ mb: 2, mx: -2 }}>
          <Tabs
            value={selectedCategory}
            onChange={(e, newValue) => {
              setSelectedCategory(newValue)
              setSearchParams({ cat: newValue })
            }}
            variant="scrollable"
            scrollButtons="auto"
            sx={{
              '& .MuiTab-root': {
                minWidth: 'auto',
                px: 2,
              },
            }}
          >
            {categories.map((cat) => (
              <Tab
                key={cat.id}
                value={cat.id}
                label={cat.label}
                icon={cat.icon}
                iconPosition="start"
              />
            ))}
          </Tabs>
        </Box>

        {/* 책 목록 */}
        {loading ? (
          <Grid container spacing={2}>
            {[...Array(4)].map((_, idx) => (
              <Grid item xs={6} key={idx}>
                <Skeleton variant="rectangular" height={200} sx={{ borderRadius: 2 }} />
                <Skeleton width="80%" sx={{ mt: 1 }} />
                <Skeleton width="60%" />
              </Grid>
            ))}
          </Grid>
        ) : books.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 6 }}>
            <MenuBook sx={{ fontSize: 60, color: 'grey.400', mb: 2 }} />
            <Typography variant="h6" color="text.secondary">
              이 카테고리에 책이 없습니다
            </Typography>
          </Box>
        ) : (
          <Grid container spacing={2}>
            {books.map((book) => (
              <Grid item xs={6} key={book.id}>
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    cursor: 'pointer',
                    transition: 'transform 0.2s',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                    },
                  }}
                >
                  <CardMedia
                    component="img"
                    height="180"
                    image={book.cover_image || 'https://via.placeholder.com/200x250'}
                    alt={book.title}
                    sx={{ objectFit: 'cover' }}
                  />
                  <CardContent sx={{ flexGrow: 1, pb: 1 }}>
                    <Typography
                      variant="subtitle2"
                      sx={{
                        fontWeight: 600,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        mb: 0.5,
                      }}
                    >
                      {book.title}
                    </Typography>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{ display: 'block', mb: 1.5 }}
                    >
                      {book.author}
                    </Typography>
                    {book.category && (
                      <Chip
                        label={book.category}
                        size="small"
                        sx={{
                          fontSize: '0.7rem',
                          height: 22,
                          bgcolor: 'primary.light',
                          color: 'white',
                        }}
                      />
                    )}
                  </CardContent>
                  <Box sx={{ px: 2, pb: 2 }}>
                    <Button
                      fullWidth
                      variant="outlined"
                      size="small"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleStartReading(book)
                      }}
                    >
                      독서 시작
                    </Button>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  )
}
