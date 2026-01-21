// 책이랑 테마 설정 - 진한 그린, 우드 느낌, 따뜻하고 부드러운 분위기
import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    primary: {
      main: '#2D5A45', // 진한 그린
      light: '#4A7C59',
      dark: '#1E3D2F',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#8B5E3C', // 우드 브라운
      light: '#A67B5B',
      dark: '#5D3A1A',
      contrastText: '#FFFFFF',
    },
    background: {
      default: '#FDF8F3', // 따뜻한 아이보리
      paper: '#FFFFFF',
    },
    text: {
      primary: '#2C2C2C',
      secondary: '#5A5A5A',
    },
  },
  typography: {
    fontFamily: '"Pretendard", "Noto Sans KR", sans-serif',
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 600,
    },
    h3: {
      fontWeight: 600,
    },
    button: {
      textTransform: 'none',
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '10px 20px',
        },
        contained: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 2px 8px rgba(45, 90, 69, 0.3)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0 2px 12px rgba(0, 0, 0, 0.08)',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
          },
        },
      },
    },
    MuiBottomNavigation: {
      styleOverrides: {
        root: {
          backgroundColor: '#FFFFFF',
          borderTop: '1px solid #E0E0E0',
        },
      },
    },
  },
})

export default theme
