import { Box, Typography, Card, CardContent, Container, Grid, Chip, LinearProgress, Avatar } from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import WorkIcon from '@mui/icons-material/Work';
import FavoriteIcon from '@mui/icons-material/Favorite';

function About() {
  // 기술 스택 데이터
  const skills = [
    { name: 'React', level: 85 },
    { name: 'JavaScript', level: 80 },
    { name: 'HTML/CSS', level: 90 },
    { name: 'Node.js', level: 70 },
    { name: 'Python', level: 65 },
    { name: 'Git', level: 75 },
  ];

  // 경력/학력 데이터
  const timeline = [
    {
      type: 'education',
      title: '컴퓨터공학과 졸업',
      organization: '00대학교',
      period: '2020 - 2024',
      description: '웹 개발 및 소프트웨어 공학 전공',
    },
    {
      type: 'work',
      title: '프론트엔드 개발 인턴',
      organization: '00기업',
      period: '2023.06 - 2023.12',
      description: 'React 기반 웹 애플리케이션 개발 참여',
    },
  ];

  // 관심 분야 데이터
  const interests = [
    '웹 개발', 'UI/UX 디자인', '인공지능', '모바일 앱', '클라우드', '오픈소스'
  ];

  return (
    <Box sx={{ backgroundColor: '#F8F8F6', minHeight: '100vh' }}>
      {/* 페이지 헤더 */}
      <Box
        sx={{
          backgroundColor: '#1A1A5E',
          py: 6,
        }}
      >
        <Box sx={{ px: 4, width: '100%' }}>
          <Typography
            variant="h1"
            sx={{
              color: '#FFF200',
              textAlign: 'center',
            }}
          >
            About Me
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: 'rgba(255, 255, 255, 0.8)',
              textAlign: 'center',
              mt: 2,
            }}
          >
            안녕하세요, 저를 소개합니다
          </Typography>
        </Box>
      </Box>

      {/* 프로필 섹션 */}
      <Container maxWidth="md">
        <Card sx={{ my: 4, overflow: 'visible' }}>
          <CardContent sx={{ py: 6 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 4 }}>
              <Avatar
                sx={{
                  width: 120,
                  height: 120,
                  bgcolor: '#1A1A5E',
                  fontSize: '3rem',
                  mb: 2,
                }}
              >
                CM
              </Avatar>
              <Typography variant="h2" gutterBottom>
                이채민
              </Typography>
              <Typography variant="body1" color="text.secondary">
                프론트엔드 개발자
              </Typography>
            </Box>

            <Box sx={{
              p: 3,
              backgroundColor: '#F8F8F6',
              borderRadius: 2,
              borderLeft: '4px solid #FFF200'
            }}>
              <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
                안녕하세요! 사용자 경험을 중요시하는 프론트엔드 개발자입니다.
                새로운 기술을 배우고 적용하는 것을 즐기며,
                깔끔하고 유지보수하기 쉬운 코드를 작성하기 위해 노력합니다.
                협업과 소통을 통해 더 나은 결과물을 만들어내는 것을 좋아합니다.
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Container>

      {/* 기술 스택 섹션 */}
      <Box sx={{ backgroundColor: '#FFF200', py: 6 }}>
        <Container maxWidth="md">
          <Typography variant="h2" sx={{ color: '#1A1A5E', textAlign: 'center', mb: 4 }}>
            기술 스택
          </Typography>
          <Card>
            <CardContent sx={{ py: 4 }}>
              <Grid container spacing={3}>
                {skills.map((skill) => (
                  <Grid item xs={12} sm={6} key={skill.name}>
                    <Box sx={{ mb: 1 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="body1" fontWeight="bold">
                          {skill.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {skill.level}%
                        </Typography>
                      </Box>
                      <LinearProgress
                        variant="determinate"
                        value={skill.level}
                        sx={{
                          height: 10,
                          borderRadius: 5,
                          backgroundColor: '#F8F8F6',
                          '& .MuiLinearProgress-bar': {
                            backgroundColor: '#1A1A5E',
                            borderRadius: 5,
                          },
                        }}
                      />
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Container>
      </Box>

      {/* 경력 및 학력 섹션 */}
      <Container maxWidth="md">
        <Box sx={{ py: 6 }}>
          <Typography variant="h2" sx={{ textAlign: 'center', mb: 4 }}>
            경력 및 학력
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {timeline.map((item, index) => (
              <Card key={index}>
                <CardContent sx={{ display: 'flex', gap: 3, alignItems: 'flex-start' }}>
                  <Box
                    sx={{
                      width: 50,
                      height: 50,
                      borderRadius: '50%',
                      backgroundColor: item.type === 'education' ? '#1A1A5E' : '#FFF200',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    {item.type === 'education' ? (
                      <SchoolIcon sx={{ color: '#FFF200' }} />
                    ) : (
                      <WorkIcon sx={{ color: '#1A1A5E' }} />
                    )}
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="h6" gutterBottom>
                      {item.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      {item.organization} | {item.period}
                    </Typography>
                    <Typography variant="body1">
                      {item.description}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Box>
      </Container>

      {/* 관심 분야 섹션 */}
      <Box sx={{ backgroundColor: '#1A1A5E', py: 6 }}>
        <Container maxWidth="md">
          <Typography variant="h2" sx={{ color: '#FFF200', textAlign: 'center', mb: 4 }}>
            관심 분야
          </Typography>
          <Card>
            <CardContent sx={{ py: 4 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 3 }}>
                <FavoriteIcon sx={{ color: '#1A1A5E', mr: 1 }} />
                <Typography variant="body1" color="text.secondary">
                  제가 관심을 가지고 있는 분야들입니다
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5, justifyContent: 'center' }}>
                {interests.map((interest) => (
                  <Chip
                    key={interest}
                    label={interest}
                    sx={{
                      backgroundColor: '#F8F8F6',
                      color: '#1A1A5E',
                      fontWeight: 'bold',
                      fontSize: '0.95rem',
                      py: 2.5,
                      '&:hover': {
                        backgroundColor: '#FFF200',
                      },
                    }}
                  />
                ))}
              </Box>
            </CardContent>
          </Card>
        </Container>
      </Box>
    </Box>
  );
}

export default About;
