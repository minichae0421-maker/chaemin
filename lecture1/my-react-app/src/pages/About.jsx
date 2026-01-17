import { Box, Typography, Card, CardContent, Container } from '@mui/material';

function About() {
  return (
    <Box sx={{ backgroundColor: '#F8F8F6', minHeight: '100vh' }}>
      {/* 페이지 헤더 */}
      <Box
        sx={{
          backgroundColor: '#1A1A5E',
          py: 6,
        }}
      >
        <Container maxWidth="md">
          <Typography
            variant="h1"
            sx={{
              color: '#FFF200',
              textAlign: 'center',
            }}
          >
            About Me
          </Typography>
        </Container>
      </Box>

      {/* 내용 */}
      <Container maxWidth="md">
        <Box
          sx={{
            py: 6,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Card sx={{ width: '100%' }}>
            <CardContent sx={{ py: 6, textAlign: 'center' }}>
              <Typography variant="h2" gutterBottom>
                About Me 페이지가 개발될 공간입니다
              </Typography>
              <Typography variant="body1" color="text.secondary" paragraph>
                상세한 자기소개가 들어갈 예정입니다.
              </Typography>
              <Box
                sx={{
                  mt: 4,
                  p: 4,
                  backgroundColor: '#F8F8F6',
                  borderRadius: 2,
                  border: '2px dashed #FFF200',
                }}
              >
                <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                  이 공간에는 다음과 같은 내용이 추가될 예정이에요:
                </Typography>
                <Box sx={{ textAlign: 'left', maxWidth: 300, mx: 'auto' }}>
                  <Typography variant="body1" color="text.secondary">• 자기소개</Typography>
                  <Typography variant="body1" color="text.secondary">• 기술 스택</Typography>
                  <Typography variant="body1" color="text.secondary">• 경력 및 학력</Typography>
                  <Typography variant="body1" color="text.secondary">• 관심 분야</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Container>
    </Box>
  );
}

export default About;
