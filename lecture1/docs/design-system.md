# 디자인 시스템

## 색상 팔레트
```javascript
const colors = {
  primary: '#667eea',
  secondary: '#764ba2',
  background: '#ffffff',
  text: '#333333',
  error: '#f44336',
  success: '#4caf50'
};
```

## 타이포그래피
- 제목: `clamp(2rem, 8vw, 3.5rem)`
- 본문: `clamp(1rem, 4vw, 1.3rem)`
- 폰트: `'Segoe UI', sans-serif`

## 간격 시스템
- xs: 4px
- sm: 8px
- md: 16px
- lg: 24px
- xl: 32px

## MUI 테마 적용
```javascript
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: { main: '#667eea' },
    secondary: { main: '#764ba2' }
  }
});
```
