// 로그인 페이지
import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import {
  Box,
  Container,
  TextField,
  Button,
  Typography,
  Paper,
  Divider,
  Alert,
  IconButton,
  InputAdornment,
} from '@mui/material'
import {
  Visibility,
  VisibilityOff,
  MenuBook as MenuBookIcon,
  Google as GoogleIcon,
} from '@mui/icons-material'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      await login(username, password)
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
          {/* 로고 */}
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <MenuBookIcon sx={{ fontSize: 60, color: 'primary.main', mb: 1 }} />
            <Typography
              variant="h4"
              sx={{ fontWeight: 700, color: 'primary.main' }}
            >
              책이랑
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              당신의 독서 여정을 함께합니다
            </Typography>
          </Box>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="아이디"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              margin="normal"
              required
              autoFocus
            />
            <TextField
              fullWidth
              label="비밀번호"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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

            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              disabled={loading}
              sx={{ mt: 3, mb: 2, py: 1.5 }}
            >
              {loading ? '로그인 중...' : '로그인'}
            </Button>

            <Button
              fullWidth
              variant="outlined"
              size="large"
              component={Link}
              to="/signup"
              sx={{ mb: 3 }}
            >
              회원가입
            </Button>

            <Divider sx={{ my: 2 }}>
              <Typography variant="body2" color="text.secondary">
                또는
              </Typography>
            </Divider>

            <Button
              fullWidth
              variant="outlined"
              startIcon={<GoogleIcon />}
              sx={{
                color: 'text.primary',
                borderColor: 'grey.300',
                '&:hover': { borderColor: 'grey.400', bgcolor: 'grey.50' },
              }}
              onClick={() => alert('소셜 로그인은 준비 중입니다.')}
            >
              Google로 계속하기
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  )
}
