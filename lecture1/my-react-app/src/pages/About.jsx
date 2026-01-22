import { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Container,
  Grid,
  Chip,
  Avatar,
  Tabs,
  Tab,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SchoolIcon from '@mui/icons-material/School';
import WorkIcon from '@mui/icons-material/Work';
import CodeIcon from '@mui/icons-material/Code';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import PsychologyIcon from '@mui/icons-material/Psychology';
import PersonIcon from '@mui/icons-material/Person';

function About() {
  // About Me 데이터 구조
  const [aboutMeData] = useState({
    basicInfo: {
      name: '이채민',
      education: '영남대학교 시각디자인과',
      major: '웹 디자인',
      experience: '신입',
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
    },
    sections: [
      {
        id: 'dev-story',
        title: '나의 개발 스토리',
        icon: <AutoStoriesIcon />,
        content: '나를 간략히 표현할 수 있는 웹사이트를 만들고 싶었습니다. 디자인을 전공하면서 "내가 직접 만들어보면 어떨까?"라는 생각이 들었고, 그렇게 웹 개발의 세계에 발을 들이게 되었습니다. 처음에는 HTML, CSS부터 시작해서 지금은 React까지 배우며 성장하고 있습니다.',
        showInHome: true,
      },
      {
        id: 'philosophy',
        title: '개발 철학',
        icon: <PsychologyIcon />,
        content: '내가 만족하는 결과물을 만들자. 다른 사람의 기대에 맞추기보다, 스스로가 자랑스러워할 수 있는 작업을 하고 싶습니다. 그래야 진정으로 열정을 담을 수 있고, 그 열정은 결과물에 고스란히 드러난다고 믿습니다.',
        showInHome: true,
      },
      {
        id: 'personal',
        title: '개인적인 이야기',
        icon: <PersonIcon />,
        content: 'AI에 관심이 많습니다. 새로운 AI 도구가 나오면 꼭 써보고, 어떻게 활용할 수 있을지 고민합니다. 음악 듣는 것을 좋아하고, 특히 작업할 때 lo-fi 음악을 자주 틉니다. 산책하면서 생각을 정리하는 것도 좋아합니다. 걷다 보면 막혔던 아이디어가 풀리는 경험을 자주 합니다.',
        showInHome: false,
      },
    ],
  });

  // 탭 상태
  const [tabValue, setTabValue] = useState(0);

  // 아코디언 상태
  const [expanded, setExpanded] = useState('dev-story');

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

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
        <Box sx={{ width: '100%', px: 4 }}>
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
            저를 소개합니다
          </Typography>
        </Box>
      </Box>

      {/* 기본 정보 카드 */}
      <Container maxWidth="md">
        <Card
          sx={{
            my: -4,
            position: 'relative',
            zIndex: 1,
            overflow: 'visible',
          }}
        >
          <CardContent sx={{ py: 5 }}>
            <Grid container spacing={4} alignItems="center">
              {/* 프로필 사진 */}
              <Grid item xs={12} md={4}>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                  <Avatar
                    src={aboutMeData.basicInfo.photo}
                    alt={aboutMeData.basicInfo.name}
                    sx={{
                      width: 180,
                      height: 180,
                      border: '4px solid #FFF200',
                      boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                    }}
                  />
                </Box>
              </Grid>

              {/* 기본 정보 */}
              <Grid item xs={12} md={8}>
                <Typography
                  variant="h3"
                  sx={{ color: '#1A1A5E', fontWeight: 700, mb: 3 }}
                >
                  {aboutMeData.basicInfo.name}
                </Typography>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {/* 학력 */}
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box
                      sx={{
                        width: 40,
                        height: 40,
                        borderRadius: '50%',
                        backgroundColor: '#FFF200',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <SchoolIcon sx={{ color: '#1A1A5E' }} />
                    </Box>
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        학력
                      </Typography>
                      <Typography variant="body1" fontWeight={500}>
                        {aboutMeData.basicInfo.education}
                      </Typography>
                    </Box>
                  </Box>

                  {/* 전공 */}
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box
                      sx={{
                        width: 40,
                        height: 40,
                        borderRadius: '50%',
                        backgroundColor: '#1A1A5E',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <CodeIcon sx={{ color: '#FFF200' }} />
                    </Box>
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        전공
                      </Typography>
                      <Typography variant="body1" fontWeight={500}>
                        {aboutMeData.basicInfo.major}
                      </Typography>
                    </Box>
                  </Box>

                  {/* 경력 */}
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box
                      sx={{
                        width: 40,
                        height: 40,
                        borderRadius: '50%',
                        backgroundColor: '#FFF200',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <WorkIcon sx={{ color: '#1A1A5E' }} />
                    </Box>
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        경력
                      </Typography>
                      <Chip
                        label={aboutMeData.basicInfo.experience}
                        size="small"
                        sx={{
                          backgroundColor: '#1A1A5E',
                          color: '#FFF200',
                          fontWeight: 'bold',
                        }}
                      />
                    </Box>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Container>

      {/* 콘텐츠 섹션 - 탭 형태 (데스크탑) */}
      <Container maxWidth="md" sx={{ mt: 8, mb: 4 }}>
        <Box sx={{ display: { xs: 'none', md: 'block' } }}>
          <Card>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs
                value={tabValue}
                onChange={handleTabChange}
                variant="fullWidth"
                sx={{
                  '& .MuiTab-root': {
                    py: 2,
                    fontSize: '1rem',
                    fontWeight: 500,
                  },
                  '& .Mui-selected': {
                    color: '#1A1A5E',
                  },
                  '& .MuiTabs-indicator': {
                    backgroundColor: '#FFF200',
                    height: 3,
                  },
                }}
              >
                {aboutMeData.sections.map((section) => (
                  <Tab
                    key={section.id}
                    label={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        {section.icon}
                        {section.title}
                        {section.showInHome && (
                          <Chip
                            label="Home"
                            size="small"
                            sx={{
                              height: 20,
                              fontSize: '0.7rem',
                              backgroundColor: '#FFF200',
                              color: '#1A1A5E',
                            }}
                          />
                        )}
                      </Box>
                    }
                  />
                ))}
              </Tabs>
            </Box>
            <CardContent sx={{ py: 5, px: 4 }}>
              {aboutMeData.sections.map((section, index) => (
                <Box
                  key={section.id}
                  role="tabpanel"
                  hidden={tabValue !== index}
                >
                  {tabValue === index && (
                    <Box>
                      <Typography
                        variant="h5"
                        sx={{ color: '#1A1A5E', mb: 3, fontWeight: 600 }}
                      >
                        {section.title}
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{ lineHeight: 2, color: '#444', fontSize: '1.05rem' }}
                      >
                        {section.content}
                      </Typography>
                    </Box>
                  )}
                </Box>
              ))}
            </CardContent>
          </Card>
        </Box>

        {/* 콘텐츠 섹션 - 아코디언 형태 (모바일) */}
        <Box sx={{ display: { xs: 'block', md: 'none' } }}>
          {aboutMeData.sections.map((section) => (
            <Accordion
              key={section.id}
              expanded={expanded === section.id}
              onChange={handleAccordionChange(section.id)}
              sx={{
                mb: 2,
                '&:before': { display: 'none' },
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon sx={{ color: '#1A1A5E' }} />}
                sx={{
                  backgroundColor: expanded === section.id ? '#FFF200' : '#fff',
                  '&:hover': { backgroundColor: '#FFF200' },
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <Box sx={{ color: '#1A1A5E' }}>{section.icon}</Box>
                  <Typography fontWeight={500} sx={{ color: '#1A1A5E' }}>
                    {section.title}
                  </Typography>
                  {section.showInHome && (
                    <Chip
                      label="Home"
                      size="small"
                      sx={{
                        height: 18,
                        fontSize: '0.65rem',
                        backgroundColor: '#1A1A5E',
                        color: '#FFF200',
                      }}
                    />
                  )}
                </Box>
              </AccordionSummary>
              <AccordionDetails sx={{ py: 3 }}>
                <Typography sx={{ lineHeight: 1.9, color: '#444' }}>
                  {section.content}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      </Container>

      {/* 관심사 태그 섹션 */}
      <Box sx={{ backgroundColor: '#1A1A5E', py: 6 }}>
        <Container maxWidth="md">
          <Typography
            variant="h5"
            sx={{ color: '#FFF200', textAlign: 'center', mb: 4 }}
          >
            관심 분야
          </Typography>
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 1.5,
              justifyContent: 'center',
            }}
          >
            {['AI', '음악', '산책', '웹 디자인', 'UI/UX', 'React'].map((tag) => (
              <Chip
                key={tag}
                label={tag}
                sx={{
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  color: '#fff',
                  fontSize: '0.95rem',
                  py: 2,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    backgroundColor: '#FFF200',
                    color: '#1A1A5E',
                    transform: 'scale(1.05)',
                  },
                }}
              />
            ))}
          </Box>
        </Container>
      </Box>
    </Box>
  );
}

export default About;
