// 회원가입 페이지
import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import {
  Box,
  Container,
  TextField,
  Button,
  Typography,
  Paper,
  Alert,
  IconButton,
  InputAdornment,
} from '@mui/material'
import {
  Visibility,
  VisibilityOff,
  ArrowBack,
  MenuBook as MenuBookIcon,
} from '@mui/icons-material'
import { useAuth } from '../context/AuthContext'
import { supabase } from '../lib/supabase'

export default function Signup() {
  const navigate = useNavigate()
  const { signup } = useAuth()
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    nickname: '',
    email: '',
  })
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [usernameChecked, setUsernameChecked] = useState(false)
  const [usernameAvailable, setUsernameAvailable] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (name === 'username') {
      setUsernameChecked(false)
      setUsernameAvailable(false)
    }
  }

  // 아이디 중복 확인
  const checkUsername = async () => {
    if (!formData.username) {
      setError('아이디를 입력해주세요.')
      return
    }

    const { data } = await supabase
      .from('users')
      .select('id')
      .eq('username', formData.username)
      .single()

    if (data) {
      setError('이미 사용 중인 아이디입니다.')
      setUsernameAvailable(false)
    } else {
      setError('')
      setUsernameAvailable(true)
    }
    setUsernameChecked(true)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    // 유효성 검사
    if (!usernameChecked || !usernameAvailable) {
      setError('아이디 중복확인을 해주세요.')
      return
    }

    if (formData.password !== formData.confirmPassword) {
      setError('비밀번호가 일치하지 않습니다.')
      return
    }

    if (formData.password.length < 4) {
      setError('비밀번호는 4자 이상이어야 합니다.')
      return
    }

    setLoading(true)

    try {
      await signup(
        formData.username,
        formData.password,
        formData.nickname,
        formData.email
      )
      navigate('/home')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'background.default',
        p: 2,
      }}
    >
      <Container maxWidth="xs">
        <Paper
          elevation={0}
          sx={{
            p: 4,
            borderRadius: 3,
            bgcolor: 'background.paper',
          }}
        >
          {/* 뒤로가기 & 타이틀 */}
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <IconButton
              component={Link}
              to="/login"
              sx={{ mr: 1 }}
            >
              <ArrowBack />
            </IconButton>
            <Typography variant="h5" sx={{ fontWeight: 600 }}>
              회원가입
            </Typography>
          </Box>

          {/* 로고 */}
          <Box sx={{ textAlign: 'center', mb: 3 }}>
            <MenuBookIcon sx={{ fontSize: 48, color: 'primary.main' }} />
          </Box>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          {usernameChecked && usernameAvailable && (
            <Alert severity="success" sx={{ mb: 2 }}>
              사용 가능한 아이디입니다.
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit}>
            {/* 아이디 + 중복확인 */}
            <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
              <TextField
                fullWidth
                label="아이디"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
              />
              <Button
                variant="outlined"
                onClick={checkUsername}
                sx={{ minWidth: 100 }}
              >
                중복확인
              </Button>
            </Box>

            <TextField
              fullWidth
              label="비밀번호"
              name="password"
              type={showPassword ? 'text' : 'password'}
              value={formData.password}
              onChange={handleChange}
              margin="normal"
              required
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              fullWidth
              label="비밀번호 확인"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              margin="normal"
              required
            />

            <TextField
              fullWidth
              label="닉네임"
              name="nickname"
              value={formData.nickname}
              onChange={handleChange}
              margin="normal"
              required
            />

            <TextField
              fullWidth
              label="이메일 (선택)"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              margin="normal"
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              disabled={loading}
              sx={{ mt: 3, py: 1.5 }}
            >
              {loading ? '가입 중...' : '가입하기'}
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  )
}
