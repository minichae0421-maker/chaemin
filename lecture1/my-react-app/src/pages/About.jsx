import { Box, Typography, Card, CardContent, Container, Grid, Chip, Avatar } from '@mui/material';
import BrushIcon from '@mui/icons-material/Brush';
import PsychologyIcon from '@mui/icons-material/Psychology';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import FavoriteIcon from '@mui/icons-material/Favorite';

function About() {
  // 가치관/관심사/목표 데이터
  const highlights = [
    {
      icon: <BrushIcon sx={{ fontSize: 32 }} />,
      title: '가치관',
      content: '즐겁게 디자인하기',
      color: '#FFF200',
    },
    {
      icon: <PsychologyIcon sx={{ fontSize: 32 }} />,
      title: '관심사',
      content: 'AI & 디자인',
      color: '#FFFFFF',
    },
    {
      icon: <RocketLaunchIcon sx={{ fontSize: 32 }} />,
      title: '목표',
      content: '시니어 개발자',
      color: '#FFF200',
    },
  ];

  // 스킬 데이터
  const skills = [
    { name: 'HTML', level: '상' },
    { name: 'CSS', level: '상' },
    { name: 'JavaScript', level: '중' },
    { name: 'React', level: '중' },
    { name: 'Node.js', level: '하' },
    { name: 'Figma', level: '중' },
  ];

  // 관심 분야 데이터
  const interests = [
    '웹 디자인', 'UI/UX', 'AI 디자인', '인터랙션', '브랜딩', '타이포그래피'
  ];

  return (
    <Box sx={{ backgroundColor: '#F8F8F6', minHeight: '100vh' }}>
      {/* 페이지 헤더 */}
      <Box
        sx={{
          backgroundColor: '#1A1A5E',
          py: 8,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* 배경 장식 */}
        <Box
          sx={{
            position: 'absolute',
            top: -50,
            right: -50,
            width: 200,
            height: 200,
            borderRadius: '50%',
            backgroundColor: '#FFF200',
            opacity: 0.1,
          }}
        />
        <Container maxWidth="md">
          <Typography
            variant="h1"
            sx={{
              color: '#FFF200',
              textAlign: 'center',
              fontSize: { xs: '2.5rem', md: '3.5rem' },
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
              fontSize: '1.1rem',
            }}
          >
            안녕하세요, 웹디자이너 이채민입니다
          </Typography>
        </Container>
      </Box>

      {/* 프로필 & 스토리 섹션 */}
      <Container maxWidth="md">
        <Card sx={{ my: -4, position: 'relative', zIndex: 1 }}>
          <CardContent sx={{ py: 6 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 4 }}>
              <Avatar
                sx={{
                  width: 120,
                  height: 120,
                  bgcolor: '#1A1A5E',
                  fontSize: '2.5rem',
                  mb: 3,
                  border: '4px solid #FFF200',
                }}
              >
                CM
              </Avatar>
              <Typography variant="h4" gutterBottom sx={{ color: '#1A1A5E', fontWeight: 600 }}>
                이채민
              </Typography>
              <Typography variant="body1" sx={{ color: '#666' }}>
                웹디자이너 · 프론트엔드 개발자
              </Typography>
            </Box>

            {/* 스토리텔링 */}
            <Box sx={{
              p: 4,
              backgroundColor: '#F8F8F6',
              borderRadius: 2,
              borderLeft: '4px solid #FFF200',
              mb: 4,
            }}>
              <Typography variant="h6" sx={{ color: '#1A1A5E', mb: 2 }}>
                나의 이야기
              </Typography>
              <Typography variant="body1" sx={{ lineHeight: 2, color: '#444' }}>
                <strong>"나를 표현하는 웹사이트를 만들고 싶다"</strong>는 마음으로 시작했습니다.
                <br /><br />
                디자인을 할 때 가장 중요하게 생각하는 것은 <strong>'즐거움'</strong>입니다.
                제가 즐겁게 만든 것이 사용자에게도 즐거운 경험이 되길 바랍니다.
                <br /><br />
                요즘은 <strong>AI와 디자인의 결합</strong>에 큰 관심을 가지고 있습니다.
                새로운 기술을 배우고 적용하는 것을 좋아하며,
                궁극적으로 <strong>시니어 웹 개발자</strong>로 성장하는 것이 목표입니다.
              </Typography>
            </Box>

            {/* 가치관/관심사/목표 카드 */}
            <Grid container spacing={3}>
              {highlights.map((item) => (
                <Grid item xs={12} sm={4} key={item.title}>
                  <Box
                    sx={{
                      p: 3,
                      textAlign: 'center',
                      backgroundColor: '#1A1A5E',
                      borderRadius: 2,
                      height: '100%',
                      transition: 'transform 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                      },
                    }}
                  >
                    <Box sx={{ color: item.color, mb: 1 }}>
                      {item.icon}
                    </Box>
                    <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)', mb: 1 }}>
                      {item.title}
                    </Typography>
                    <Typography variant="h6" sx={{ color: item.color, fontWeight: 600 }}>
                      {item.content}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </CardContent>
        </Card>
      </Container>

      {/* 기술 스택 섹션 - 메뉴판 스타일 */}
      <Box sx={{ backgroundColor: '#FFF200', py: 8, mt: 6 }}>
        <Container maxWidth="sm">
          <Typography variant="h4" sx={{ color: '#1A1A5E', textAlign: 'center', mb: 4, fontWeight: 600 }}>
            Skills
          </Typography>
          <Card
            sx={{
              backgroundColor: '#FFFEF5',
              border: '3px solid #1A1A5E',
              borderRadius: 2,
              boxShadow: '6px 6px 0px #1A1A5E',
            }}
          >
            <CardContent sx={{ py: 4, px: 4 }}>
              <Box sx={{ textAlign: 'center', mb: 3 }}>
                <Typography
                  sx={{
                    fontFamily: 'Georgia, serif',
                    fontStyle: 'italic',
                    color: '#1A1A5E',
                    letterSpacing: 2,
                  }}
                >
                  ~ MY SKILL SET ~
                </Typography>
              </Box>
              <Box sx={{ borderTop: '2px solid #1A1A5E', borderBottom: '2px solid #1A1A5E', py: 0.5, mb: 3 }} />

              {skills.map((skill, index) => (
                <Box
                  key={skill.name}
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    py: 1.2,
                    borderBottom: index < skills.length - 1 ? '1px dashed #ddd' : 'none',
                  }}
                >
                  <Typography sx={{ fontFamily: 'Georgia, serif', color: '#1A1A5E' }}>
                    {skill.name}
                  </Typography>
                  <Box sx={{ flex: 1, mx: 2, borderBottom: '1px dotted #bbb' }} />
                  <Typography
                    sx={{
                      fontFamily: 'Georgia, serif',
                      fontStyle: 'italic',
                      color: skill.level === '상' ? '#1A1A5E' : skill.level === '중' ? '#666' : '#999',
                    }}
                  >
                    *{skill.level}*
                  </Typography>
                </Box>
              ))}

              <Box sx={{ borderTop: '2px solid #1A1A5E', borderBottom: '2px solid #1A1A5E', py: 0.5, mt: 3 }} />
            </CardContent>
          </Card>
        </Container>
      </Box>

      {/* 관심 분야 섹션 */}
      <Box sx={{ backgroundColor: '#1A1A5E', py: 8 }}>
        <Container maxWidth="md">
          <Typography variant="h4" sx={{ color: '#FFF200', textAlign: 'center', mb: 4, fontWeight: 600 }}>
            관심 분야
          </Typography>
          <Card>
            <CardContent sx={{ py: 4 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 3 }}>
                <FavoriteIcon sx={{ color: '#1A1A5E', mr: 1 }} />
                <Typography variant="body1" color="text.secondary">
                  제가 열정을 가지고 있는 분야들입니다
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
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        backgroundColor: '#FFF200',
                        transform: 'scale(1.05)',
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
