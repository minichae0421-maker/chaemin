import { Box, Typography, Card, CardContent, Container, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import ContactSection from '../components/ContactSection';

function Home() {
  // 스킬 메뉴판 데이터
  const skillMenu = [
    { name: 'HTML', level: '상' },
    { name: 'CSS', level: '상' },
    { name: 'JavaScript', level: '중' },
    { name: 'React', level: '중' },
    { name: 'Node.js', level: '하' },
  ];

  return (
    <Box sx={{ backgroundColor: '#F8F8F6' }}>
      {/* Hero 섹션 - 임팩트형 */}
      <Box
        sx={{
          backgroundColor: '#1A1A5E',
          py: 12,
          minHeight: '80vh',
          display: 'flex',
          alignItems: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* 배경 장식 */}
        <Box
          sx={{
            position: 'absolute',
            top: -100,
            right: -100,
            width: 400,
            height: 400,
            borderRadius: '50%',
            backgroundColor: '#FFF200',
            opacity: 0.1,
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: -50,
            left: -50,
            width: 200,
            height: 200,
            borderRadius: '50%',
            backgroundColor: '#FFF200',
            opacity: 0.1,
          }}
        />

        <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
          <Box sx={{ textAlign: 'center' }}>
            <Typography
              variant="body1"
              sx={{
                color: '#FFF200',
                fontSize: '1.2rem',
                mb: 2,
                letterSpacing: 2,
              }}
            >
              HELLO, I'M
            </Typography>
            <Typography
              variant="h1"
              sx={{
                color: '#FFFFFF',
                fontSize: { xs: '2.5rem', md: '4rem' },
                fontWeight: 700,
                mb: 2,
              }}
            >
              이채민
            </Typography>
            <Typography
              variant="h2"
              sx={{
                color: '#FFF200',
                fontSize: { xs: '1.5rem', md: '2rem' },
                fontWeight: 500,
                mb: 4,
              }}
            >
              웹디자이너
            </Typography>
            <Box
              sx={{
                display: 'inline-block',
                borderLeft: '3px solid #FFF200',
                pl: 3,
                my: 4,
              }}
            >
              <Typography
                variant="body1"
                sx={{
                  color: 'rgba(255, 255, 255, 0.9)',
                  fontSize: '1.3rem',
                  fontStyle: 'italic',
                  lineHeight: 1.8,
                }}
              >
                "즐겁게 디자인하고,<br />
                함께 성장합니다"
              </Typography>
            </Box>
            <Box sx={{ mt: 5 }}>
              <Button
                variant="contained"
                component={Link}
                to="/projects"
                size="large"
                sx={{
                  backgroundColor: '#FFF200',
                  color: '#1A1A5E',
                  fontWeight: 'bold',
                  px: 5,
                  py: 1.5,
                  fontSize: '1.1rem',
                  '&:hover': {
                    backgroundColor: '#FFFFFF',
                  },
                }}
              >
                포트폴리오 보기
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* About Me 섹션 - showInHome: true인 콘텐츠 표시 */}
      <Container maxWidth="md">
        <Card sx={{ my: 6 }}>
          <CardContent sx={{ py: 6 }}>
            <Typography variant="h2" gutterBottom sx={{ color: '#1A1A5E', textAlign: 'center', mb: 4 }}>
              About Me
            </Typography>

            {/* 나의 개발 스토리 */}
            <Box
              sx={{
                p: 3,
                mb: 3,
                backgroundColor: '#F8F8F6',
                borderRadius: 2,
                borderLeft: '4px solid #FFF200',
              }}
            >
              <Typography variant="h6" sx={{ color: '#1A1A5E', mb: 1, fontWeight: 600 }}>
                나의 개발 스토리
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8 }}>
                나를 간략히 표현할 수 있는 웹사이트를 만들고 싶었습니다.
                디자인을 전공하면서 "내가 직접 만들어보면 어떨까?"라는 생각이 들었고,
                그렇게 웹 개발의 세계에 발을 들이게 되었습니다.
              </Typography>
            </Box>

            {/* 개발 철학 */}
            <Box
              sx={{
                p: 3,
                mb: 4,
                backgroundColor: '#1A1A5E',
                borderRadius: 2,
              }}
            >
              <Typography variant="h6" sx={{ color: '#FFF200', mb: 1, fontWeight: 600 }}>
                개발 철학
              </Typography>
              <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.9)', lineHeight: 1.8 }}>
                내가 만족하는 결과물을 만들자. 스스로가 자랑스러워할 수 있는 작업을 하고 싶습니다.
                그래야 진정으로 열정을 담을 수 있고, 그 열정은 결과물에 고스란히 드러난다고 믿습니다.
              </Typography>
            </Box>

            <Box sx={{ textAlign: 'center' }}>
              <Button
                variant="outlined"
                component={Link}
                to="/about"
                sx={{
                  borderColor: '#1A1A5E',
                  color: '#1A1A5E',
                  '&:hover': {
                    backgroundColor: '#1A1A5E',
                    color: '#FFF200',
                  },
                }}
              >
                더 알아보기
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Container>

      {/* Skill 섹션 - 메뉴판 UI */}
      <Box sx={{ backgroundColor: '#FFF200', py: 8 }}>
        <Container maxWidth="sm">
          <Card
            sx={{
              backgroundColor: '#FFFEF5',
              border: '3px solid #1A1A5E',
              borderRadius: 2,
              boxShadow: '8px 8px 0px #1A1A5E',
            }}
          >
            <CardContent sx={{ py: 5, px: 4 }}>
              {/* 메뉴판 헤더 */}
              <Box sx={{ textAlign: 'center', mb: 4 }}>
                <Typography
                  variant="h5"
                  sx={{
                    fontFamily: 'Georgia, serif',
                    fontStyle: 'italic',
                    color: '#1A1A5E',
                    letterSpacing: 3,
                  }}
                >
                  ~ SKILL MENU ~
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: '#666',
                    mt: 1,
                    fontFamily: 'Georgia, serif',
                  }}
                >
                  "오늘의 추천 메뉴"
                </Typography>
              </Box>

              {/* 구분선 */}
              <Box
                sx={{
                  borderTop: '2px solid #1A1A5E',
                  borderBottom: '2px solid #1A1A5E',
                  py: 0.5,
                  mb: 3,
                }}
              />

              {/* 스킬 목록 */}
              <Box sx={{ px: 2 }}>
                {skillMenu.map((skill, index) => (
                  <Box
                    key={skill.name}
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      py: 1.5,
                      borderBottom: index < skillMenu.length - 1 ? '1px dashed #ccc' : 'none',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        backgroundColor: 'rgba(26, 26, 94, 0.05)',
                        px: 1,
                        mx: -1,
                        borderRadius: 1,
                      },
                    }}
                  >
                    <Typography
                      sx={{
                        fontFamily: 'Georgia, serif',
                        fontSize: '1.1rem',
                        color: '#1A1A5E',
                        fontWeight: 500,
                      }}
                    >
                      {skill.name}
                    </Typography>
                    <Box sx={{ flex: 1, mx: 2, borderBottom: '1px dotted #999' }} />
                    <Typography
                      sx={{
                        fontFamily: 'Georgia, serif',
                        fontStyle: 'italic',
                        fontSize: '1rem',
                        color: skill.level === '상' ? '#1A1A5E' : skill.level === '중' ? '#666' : '#999',
                        fontWeight: skill.level === '상' ? 600 : 400,
                      }}
                    >
                      *{skill.level}*
                    </Typography>
                  </Box>
                ))}
              </Box>

              {/* 구분선 */}
              <Box
                sx={{
                  borderTop: '2px solid #1A1A5E',
                  borderBottom: '2px solid #1A1A5E',
                  py: 0.5,
                  mt: 3,
                  mb: 2,
                }}
              />

              {/* 메뉴판 푸터 */}
              <Box sx={{ textAlign: 'center' }}>
                <Typography
                  variant="body2"
                  sx={{
                    fontFamily: 'Georgia, serif',
                    fontStyle: 'italic',
                    color: '#888',
                    fontSize: '0.9rem',
                  }}
                >
                  Thank you for visiting
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Container>
      </Box>

      {/* Projects 섹션 */}
      <Container maxWidth="md">
        <Card sx={{ my: 6 }}>
          <CardContent sx={{ py: 6, textAlign: 'center' }}>
            <Typography variant="h2" gutterBottom sx={{ color: '#1A1A5E' }}>
              Projects
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
              제가 작업한 프로젝트들을 소개합니다.<br />
              각 프로젝트에는 기획부터 디자인, 개발까지의 과정이 담겨있습니다.
            </Typography>
            <Box
              sx={{
                mt: 4,
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
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      borderStyle: 'solid',
                      backgroundColor: '#FFF200',
                      transform: 'translateY(-4px)',
                    },
                  }}
                >
                  <Typography color="text.secondary">Project {num}</Typography>
                </Box>
              ))}
            </Box>
            <Button
              variant="contained"
              component={Link}
              to="/projects"
              sx={{
                mt: 4,
                backgroundColor: '#1A1A5E',
                '&:hover': {
                  backgroundColor: '#2D2D7E',
                },
              }}
            >
              전체 보기
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
