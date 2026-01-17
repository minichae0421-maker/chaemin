import { Container, Typography, Box } from '@mui/material'

// 섹션 컴포넌트들
import SectionFlexNavigation from './components/sections/SectionFlexNavigation'

function App() {
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      {/* 헤더 영역 */}
      <Box
        sx={{
          py: 6,
          bgcolor: 'primary.main',
          color: 'white',
          textAlign: 'center'
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="h3" component="h1" gutterBottom>
            MUI UI Components
          </Typography>
          <Typography variant="subtitle1">
            16개 UI 요소 학습 프로젝트
          </Typography>
        </Container>
      </Box>

      {/* 메인 컨텐츠 영역 */}
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Flex Navigation 섹션 */}
        <SectionFlexNavigation />
      </Container>

      {/* 푸터 영역 */}
      <Box
        sx={{
          py: 3,
          bgcolor: 'grey.100',
          textAlign: 'center',
          mt: 'auto'
        }}
      >
        <Typography variant="body2" color="text.secondary">
          React + MUI UI Test Project
        </Typography>
      </Box>
    </Box>
  )
}

export default App
