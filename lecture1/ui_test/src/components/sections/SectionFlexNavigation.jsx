import { Box, Typography, Paper } from '@mui/material'

// Flex Navigation 섹션
// CSS Flexbox를 사용한 네비게이션 구현

function SectionFlexNavigation() {
  // 메뉴 클릭 핸들러
  const handleMenuClick = (menu) => {
    alert(`${menu} 메뉴가 클릭되었습니다!`)
  }

  return (
    <Box sx={{ py: 4 }}>
      {/* 섹션 제목 */}
      <Typography variant="h4" component="h2" gutterBottom>
        Flex Navigation
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        CSS Flexbox를 사용한 반응형 네비게이션 바 구현
      </Typography>

      {/* 데모 영역 */}
      <Paper sx={{ p: 3, bgcolor: '#1a202c' }}>
        {/* 네비게이션 바 */}
        <Box
          sx={{
            width: '100%',
            height: '60px',
            bgcolor: '#2d3748',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            px: 3,
            borderRadius: 1,
          }}
        >
          {/* 로고 박스 */}
          <Box
            sx={{
              color: 'white',
              fontWeight: 'bold',
              fontSize: '20px',
              cursor: 'pointer',
            }}
            onClick={() => handleMenuClick('로고')}
          >
            MyWebsite
          </Box>

          {/* 메뉴들 박스 */}
          <Box
            sx={{
              display: 'flex',
              gap: '15px',
            }}
          >
            {['홈', '소개', '상품', '연락처', '설정'].map((menu) => (
              <Box
                key={menu}
                onClick={() => handleMenuClick(menu)}
                sx={{
                  color: '#a0aec0',
                  fontSize: '16px',
                  cursor: 'pointer',
                  transition: 'color 0.2s ease',
                  '&:hover': {
                    color: 'white',
                  },
                }}
              >
                {menu}
              </Box>
            ))}
          </Box>
        </Box>

        {/* 코드 설명 */}
        <Box sx={{ mt: 3, p: 2, bgcolor: '#2d3748', borderRadius: 1 }}>
          <Typography variant="subtitle2" sx={{ color: '#68d391', mb: 1 }}>
            핵심 Flexbox 속성:
          </Typography>
          <Typography variant="body2" sx={{ color: '#e2e8f0', fontFamily: 'monospace' }}>
            • display: flex - 플렉스 컨테이너 설정<br />
            • justify-content: space-between - 양 끝 정렬<br />
            • align-items: center - 수직 중앙 정렬<br />
            • gap: 15px - 메뉴 항목 간격
          </Typography>
        </Box>
      </Paper>
    </Box>
  )
}

export default SectionFlexNavigation
