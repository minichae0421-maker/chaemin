// 메인 앱 - 라우팅 설정
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ThemeProvider, CssBaseline, Box } from '@mui/material'
import theme from './theme'
import { AuthProvider } from './context/AuthContext'

// 레이아웃
import Layout from './components/Layout'

// 페이지
import Login from './pages/Login'
import Signup from './pages/Signup'
import Home from './pages/Home'
import WritePost from './pages/WritePost'
import PostDetail from './pages/PostDetail'
import MyPage from './pages/MyPage'
import Category from './pages/Category'

// 모바일 앱 컨테이너 래퍼
function MobileWrapper({ children }) {
  return (
    <Box className="app-container">
      {children}
    </Box>
  )
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* 인증 페이지 (레이아웃 없음) */}
            <Route path="/login" element={<MobileWrapper><Login /></MobileWrapper>} />
            <Route path="/signup" element={<MobileWrapper><Signup /></MobileWrapper>} />

            {/* 글쓰기 페이지 (커스텀 헤더) */}
            <Route path="/write" element={<MobileWrapper><WritePost /></MobileWrapper>} />

            {/* 게시물 상세 (커스텀 헤더) */}
            <Route path="/post/:id" element={<MobileWrapper><PostDetail /></MobileWrapper>} />

            {/* 메인 레이아웃 */}
            <Route element={<Layout />}>
              <Route path="/" element={<Navigate to="/home" replace />} />
              <Route path="/home" element={<Home />} />
              <Route path="/category" element={<Category />} />
              <Route path="/mypage" element={<MyPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
