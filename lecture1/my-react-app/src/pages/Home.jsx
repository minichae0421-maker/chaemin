import { Box, Typography, Card, CardContent, Container, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import ContactSection from '../components/ContactSection';

function Home() {
  return (
    <Box sx={{ backgroundColor: '#F8F8F6' }}>
      {/* Hero 섹션 */}
      <Box
        sx={{
          backgroundColor: '#FFF200',
          py: 8,
          minHeight: '60vh',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Container maxWidth={false}>
          <Box sx={{ textAlign: 'center' }}>
            <Typography
              variant="h1"
              sx={{
                color: '#1A1A5E',
                mb: 3,
              }}
            >
              Hero 섹션
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: '#2D2D5E',
                fontSize: '1.2rem',
              }}
            >
              여기는 Hero 섹션입니다. 메인 비주얼, 이름, 간단 소개가 들어갈 예정입니다.
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* About Me 섹션 */}
      <Container maxWidth="md">
        <Card sx={{ my: 4 }}>
          <CardContent sx={{ py: 6, textAlign: 'center' }}>
            <Typography variant="h2" gutterBottom>
              About Me 섹션
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
              여기는 About Me 섹션입니다. 간단한 자기소개와 '더 알아보기' 버튼이 들어갈 예정입니다.
            </Typography>
            <Button
              variant="contained"
              component={Link}
              to="/about"
              sx={{ mt: 2 }}
            >
              더 알아보기
            </Button>
          </CardContent>
        </Card>
      </Container>

      {/* Skill Tree 섹션 */}
      <Box sx={{ backgroundColor: '#1A1A5E', py: 6 }}>
        <Container maxWidth={false}>
          <Card sx={{ backgroundColor: 'rgba(255, 255, 255, 0.95)' }}>
            <CardContent sx={{ py: 6, textAlign: 'center' }}>
              <Typography variant="h2" gutterBottom>
                Skill Tree 섹션
              </Typography>
              <Typography variant="body1" color="text.secondary">
                여기는 Skill Tree 섹션입니다. 기술 스택을 트리나 프로그레스바로 시각화할 예정입니다.
              </Typography>
              <Box
                sx={{
                  mt: 4,
                  p: 3,
                  border: '2px dashed #FFF200',
                  borderRadius: 2,
                }}
              >
                <Typography variant="body1" color="text.secondary">
                  기술 스택 시각화 영역
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Container>
      </Box>

      {/* Projects 섹션 */}
      <Container maxWidth="md">
        <Card sx={{ my: 4 }}>
          <CardContent sx={{ py: 6, textAlign: 'center' }}>
            <Typography variant="h2" gutterBottom>
              Projects 섹션
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
              여기는 Projects 섹션입니다. 대표작 썸네일 3-4개와 '더 보기' 버튼이 들어갈 예정입니다.
            </Typography>
            <Box
              sx={{
                mt: 3,
                display: 'flex',
                gap: 2,
                justifyContent: 'center',
                flexWrap: 'wrap',
              }}
            >
              {[1, 2, 3, 4].map((num) => (
                <Box
                  key={num}
                  sx={{
                    width: 150,
                    height: 100,
                    backgroundColor: '#F8F8F6',
                    border: '2px dashed #1A1A5E',
                    borderRadius: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Typography color="text.secondary">썸네일 {num}</Typography>
                </Box>
              ))}
            </Box>
            <Button
              variant="outlined"
              component={Link}
              to="/projects"
              sx={{ mt: 3 }}
            >
              더 보기
            </Button>
          </CardContent>
        </Card>
      </Container>

      {/* Contact 섹션 */}
      <ContactSection />
    </Box>
  );
}

export default Home;
