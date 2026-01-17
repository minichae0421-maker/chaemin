import { Box, Typography, Paper } from '@mui/material'

// 섹션 템플릿
// 이 파일을 복사해서 새 섹션을 만들어 사용하세요
// 예: Section01Button.jsx, Section02TextField.jsx 등

function SectionTemplate() {
  return (
    <Box sx={{ py: 4 }}>
      {/* 섹션 제목 */}
      <Typography variant="h4" component="h2" gutterBottom>
        섹션 제목
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        이 섹션에 대한 설명을 작성하세요
      </Typography>

      {/* 데모 영역 */}
      <Paper sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
          {/* UI 컴포넌트들을 여기에 추가 */}
          <Typography>UI 컴포넌트를 여기에 추가하세요</Typography>
        </Box>
      </Paper>
    </Box>
  )
}

export default SectionTemplate
