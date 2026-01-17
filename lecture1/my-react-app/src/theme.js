import { createTheme } from '@mui/material/styles';

// ELIX 컬러 팔레트 기반 MUI 테마 설정
const theme = createTheme({
  palette: {
    primary: {
      main: '#1A1A5E',
      light: '#4A4A7E',
      dark: '#0D0D4D',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#FFF200',
      light: '#FFF566',
      dark: '#CCC200',
      contrastText: '#1A1A5E',
    },
    background: {
      default: '#F8F8F6',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#1A1A5E',
      secondary: '#2D2D5E',
      disabled: '#6B6B8D',
    },
    error: {
      main: '#D32F2F',
    },
    success: {
      main: '#2E7D32',
    },
    warning: {
      main: '#ED6C02',
    },
    info: {
      main: '#1A1A5E',
    },
  },
  typography: {
    fontFamily: "'Segoe UI', sans-serif",
    h1: {
      fontSize: 'clamp(2rem, 8vw, 3.5rem)',
      fontWeight: 700,
      color: '#1A1A5E',
    },
    h2: {
      fontSize: 'clamp(1.5rem, 6vw, 2.5rem)',
      fontWeight: 600,
      color: '#1A1A5E',
    },
    h3: {
      fontSize: 'clamp(1.25rem, 5vw, 2rem)',
      fontWeight: 600,
      color: '#1A1A5E',
    },
    body1: {
      fontSize: 'clamp(1rem, 4vw, 1.2rem)',
      color: '#2D2D5E',
    },
  },
  spacing: 8,
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
          fontWeight: 600,
        },
        containedPrimary: {
          '&:hover': {
            backgroundColor: '#0D0D4D',
          },
        },
        containedSecondary: {
          color: '#1A1A5E',
          '&:hover': {
            backgroundColor: '#CCC200',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 4px 20px rgba(26, 26, 94, 0.1)',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#1A1A5E',
        },
      },
    },
  },
});

export default theme;
