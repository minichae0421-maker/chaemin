import { Box, Container, Typography, Button } from '@mui/material'

function App() {
  return (
    <Container maxWidth="md">
      <Box sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center'
      }}>
        <Typography variant="h3" gutterBottom>
          React + MUI 템플릿
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          MUI와 React Router가 설정된 기본 템플릿입니다.
        </Typography>
        <Button variant="contained" size="large">
          시작하기
        </Button>
      </Box>
    </Container>
  )
}

export default App
