// 게시물(리뷰) 작성 페이지
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Box,
  Container,
  TextField,
  Button,
  Typography,
  Paper,
  IconButton,
  Chip,
  ImageList,
  ImageListItem,
  Dialog,
  DialogTitle,
  DialogContent,
  Alert,
} from '@mui/material'
import {
  ArrowBack,
  Image as ImageIcon,
  Close,
} from '@mui/icons-material'
import { supabase } from '../lib/supabase'
import { useAuth } from '../context/AuthContext'

// 책 표지 이미지 샘플 (Unsplash)
const sampleImages = [
  'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400',
  'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400',
  'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=400',
  'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
  'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400',
  'https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=400',
  'https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=400',
]

export default function WritePost() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [formData, setFormData] = useState({
    bookTitle: '',
    title: '',
    content: '',
    hashtag: '',
  })
  const [hashtags, setHashtags] = useState([])
  const [selectedImage, setSelectedImage] = useState('')
  const [imageDialogOpen, setImageDialogOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleAddHashtag = (e) => {
    if (e.key === 'Enter' && formData.hashtag.trim()) {
      e.preventDefault()
      const tag = formData.hashtag.trim().replace('#', '')
      if (!hashtags.includes(tag) && hashtags.length < 5) {
        setHashtags([...hashtags, tag])
      }
      setFormData(prev => ({ ...prev, hashtag: '' }))
    }
  }

  const handleRemoveHashtag = (tagToRemove) => {
    setHashtags(hashtags.filter(tag => tag !== tagToRemove))
  }

  const handleSubmit = async () => {
    if (!formData.title.trim()) {
      setError('제목을 입력해주세요.')
      return
    }
    if (!formData.content.trim()) {
      setError('내용을 입력해주세요.')
      return
    }

    setLoading(true)
    setError('')

    const { error: insertError } = await supabase
      .from('posts')
      .insert([{
        title: formData.title,
        content: formData.content,
        book_title: formData.bookTitle || null,
        image_url: selectedImage || null,
        hashtags: hashtags.length > 0 ? hashtags : null,
        author_id: user?.id || null,
        likes_count: 0,
      }])

    if (insertError) {
      setError('게시물 작성에 실패했습니다.')
      setLoading(false)
      return
    }

    navigate('/home')
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
            리뷰 작성
          </Typography>
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? '등록 중...' : '등록'}
          </Button>
        </Box>
      </Paper>

      <Container maxWidth="sm" sx={{ pt: 8, pb: 4 }}>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {/* 선택된 이미지 미리보기 */}
        {selectedImage && (
          <Box sx={{ position: 'relative', mb: 2 }}>
            <img
              src={selectedImage}
              alt="선택된 이미지"
              style={{
                width: '100%',
                height: 200,
                objectFit: 'cover',
                borderRadius: 12,
              }}
            />
            <IconButton
              sx={{
                position: 'absolute',
                top: 8,
                right: 8,
                bgcolor: 'rgba(0,0,0,0.5)',
                color: 'white',
                '&:hover': { bgcolor: 'rgba(0,0,0,0.7)' },
              }}
              onClick={() => setSelectedImage('')}
            >
              <Close />
            </IconButton>
          </Box>
        )}

        {/* 이미지 선택 버튼 */}
        <Button
          variant="outlined"
          startIcon={<ImageIcon />}
          fullWidth
          sx={{ mb: 3, py: 1.5 }}
          onClick={() => setImageDialogOpen(true)}
        >
          책 표지 이미지 선택
        </Button>

        {/* 책 제목 */}
        <TextField
          fullWidth
          label="책 제목"
          name="bookTitle"
          value={formData.bookTitle}
          onChange={handleChange}
          placeholder="리뷰할 책의 제목을 입력하세요"
          sx={{ mb: 2 }}
        />

        {/* 리뷰 제목 */}
        <TextField
          fullWidth
          label="리뷰 제목"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="리뷰 제목을 입력하세요"
          required
          sx={{ mb: 2 }}
        />

        {/* 내용 */}
        <TextField
          fullWidth
          label="내용"
          name="content"
          value={formData.content}
          onChange={handleChange}
          placeholder="책에 대한 감상을 자유롭게 작성해주세요"
          multiline
          rows={8}
          required
          sx={{ mb: 2 }}
        />

        {/* 해시태그 */}
        <TextField
          fullWidth
          label="해시태그"
          name="hashtag"
          value={formData.hashtag}
          onChange={handleChange}
          onKeyPress={handleAddHashtag}
          placeholder="태그 입력 후 Enter (최대 5개)"
          sx={{ mb: 1 }}
        />
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {hashtags.map((tag, idx) => (
            <Chip
              key={idx}
              label={`#${tag}`}
              onDelete={() => handleRemoveHashtag(tag)}
              color="primary"
              variant="outlined"
            />
          ))}
        </Box>
      </Container>

      {/* 이미지 선택 다이얼로그 */}
      <Dialog
        open={imageDialogOpen}
        onClose={() => setImageDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>이미지 선택</DialogTitle>
        <DialogContent>
          <ImageList cols={2} gap={8}>
            {sampleImages.map((img, idx) => (
              <ImageListItem
                key={idx}
                sx={{
                  cursor: 'pointer',
                  borderRadius: 2,
                  overflow: 'hidden',
                  border: selectedImage === img ? '3px solid' : 'none',
                  borderColor: 'primary.main',
                }}
                onClick={() => {
                  setSelectedImage(img)
                  setImageDialogOpen(false)
                }}
              >
                <img
                  src={img}
                  alt={`책 이미지 ${idx + 1}`}
                  loading="lazy"
                  style={{ height: 150, objectFit: 'cover' }}
                />
              </ImageListItem>
            ))}
          </ImageList>
        </DialogContent>
      </Dialog>
    </Box>
  )
}
