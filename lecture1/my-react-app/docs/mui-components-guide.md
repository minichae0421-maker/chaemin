# MUI (Material-UI) 컴포넌트 가이드

## 1. 설치 및 기본 설정

### 필수 패키지
```bash
npm install @mui/material @emotion/react @emotion/styled
npm install @mui/icons-material
```

### 기본 import
```jsx
import { Button, TextField, Box } from '@mui/material';
import { Home, Settings } from '@mui/icons-material';
```

---

## 2. 레이아웃 컴포넌트

### Box
가장 기본적인 레이아웃 컴포넌트. `div` 대신 사용.

```jsx
<Box sx={{ display: 'flex', gap: 2, p: 2 }}>
  <Box>Item 1</Box>
  <Box>Item 2</Box>
</Box>
```

### Container
페이지 콘텐츠를 중앙 정렬하고 최대 너비 제한.

```jsx
<Container maxWidth="lg">
  {/* 콘텐츠 */}
</Container>
```

### Grid
반응형 그리드 레이아웃.

```jsx
<Grid container spacing={2}>
  <Grid item xs={12} md={6}>
    <Paper>왼쪽</Paper>
  </Grid>
  <Grid item xs={12} md={6}>
    <Paper>오른쪽</Paper>
  </Grid>
</Grid>
```

### Stack
요소들을 수직/수평으로 쌓기.

```jsx
<Stack direction="row" spacing={2}>
  <Button>버튼 1</Button>
  <Button>버튼 2</Button>
</Stack>
```

---

## 3. 입력 컴포넌트

### Button
```jsx
// 기본 버튼 종류
<Button variant="text">Text</Button>
<Button variant="contained">Contained</Button>
<Button variant="outlined">Outlined</Button>

// 색상
<Button color="primary">Primary</Button>
<Button color="secondary">Secondary</Button>
<Button color="error">Error</Button>

// 아이콘 포함
<Button startIcon={<SaveIcon />}>저장</Button>
```

### TextField
```jsx
// 기본 텍스트 필드
<TextField label="이름" variant="outlined" />

// 변형
<TextField variant="filled" label="Filled" />
<TextField variant="standard" label="Standard" />

// 유효성 검사
<TextField
  error
  helperText="필수 입력 항목입니다"
  label="이메일"
/>

// 멀티라인
<TextField
  multiline
  rows={4}
  label="설명"
/>
```

### Select
```jsx
<FormControl fullWidth>
  <InputLabel>나이</InputLabel>
  <Select value={age} onChange={handleChange} label="나이">
    <MenuItem value={10}>10대</MenuItem>
    <MenuItem value={20}>20대</MenuItem>
    <MenuItem value={30}>30대</MenuItem>
  </Select>
</FormControl>
```

### Checkbox / Switch
```jsx
<FormControlLabel
  control={<Checkbox checked={checked} onChange={handleChange} />}
  label="동의합니다"
/>

<FormControlLabel
  control={<Switch checked={enabled} onChange={handleToggle} />}
  label="알림 활성화"
/>
```

---

## 4. 데이터 표시 컴포넌트

### Card
```jsx
<Card sx={{ maxWidth: 345 }}>
  <CardMedia
    component="img"
    height="140"
    image="/image.jpg"
    alt="이미지"
  />
  <CardContent>
    <Typography variant="h5">제목</Typography>
    <Typography variant="body2" color="text.secondary">
      설명 텍스트
    </Typography>
  </CardContent>
  <CardActions>
    <Button size="small">자세히</Button>
  </CardActions>
</Card>
```

### Table
```jsx
<TableContainer component={Paper}>
  <Table>
    <TableHead>
      <TableRow>
        <TableCell>이름</TableCell>
        <TableCell align="right">나이</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {rows.map((row) => (
        <TableRow key={row.name}>
          <TableCell>{row.name}</TableCell>
          <TableCell align="right">{row.age}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
</TableContainer>
```

### List
```jsx
<List>
  <ListItem disablePadding>
    <ListItemButton>
      <ListItemIcon><InboxIcon /></ListItemIcon>
      <ListItemText primary="받은편지함" />
    </ListItemButton>
  </ListItem>
</List>
```

---

## 5. 피드백 컴포넌트

### Alert
```jsx
<Alert severity="error">에러 메시지</Alert>
<Alert severity="warning">경고 메시지</Alert>
<Alert severity="info">정보 메시지</Alert>
<Alert severity="success">성공 메시지</Alert>
```

### Snackbar
```jsx
<Snackbar
  open={open}
  autoHideDuration={6000}
  onClose={handleClose}
  message="저장되었습니다"
/>
```

### Dialog
```jsx
<Dialog open={open} onClose={handleClose}>
  <DialogTitle>제목</DialogTitle>
  <DialogContent>
    <DialogContentText>내용</DialogContentText>
  </DialogContent>
  <DialogActions>
    <Button onClick={handleClose}>취소</Button>
    <Button onClick={handleConfirm}>확인</Button>
  </DialogActions>
</Dialog>
```

### CircularProgress / LinearProgress
```jsx
<CircularProgress />
<LinearProgress />
```

---

## 6. 네비게이션 컴포넌트

### AppBar
```jsx
<AppBar position="static">
  <Toolbar>
    <IconButton edge="start" color="inherit">
      <MenuIcon />
    </IconButton>
    <Typography variant="h6" sx={{ flexGrow: 1 }}>
      My App
    </Typography>
    <Button color="inherit">Login</Button>
  </Toolbar>
</AppBar>
```

### Drawer
```jsx
<Drawer anchor="left" open={open} onClose={toggleDrawer}>
  <List>
    <ListItem button>
      <ListItemText primary="메뉴 1" />
    </ListItem>
  </List>
</Drawer>
```

### Tabs
```jsx
<Tabs value={value} onChange={handleChange}>
  <Tab label="탭 1" />
  <Tab label="탭 2" />
  <Tab label="탭 3" />
</Tabs>
```

---

## 7. sx prop 스타일링

### 기본 사용법
```jsx
<Box
  sx={{
    width: 300,
    height: 300,
    backgroundColor: 'primary.main',
    '&:hover': {
      backgroundColor: 'primary.dark',
    },
  }}
/>
```

### 반응형 값
```jsx
<Box
  sx={{
    width: {
      xs: 100,  // 0px 이상
      sm: 200,  // 600px 이상
      md: 300,  // 900px 이상
      lg: 400,  // 1200px 이상
    },
  }}
/>
```

### 자주 쓰는 축약어
| 축약어 | 의미 |
|--------|------|
| m | margin |
| mt, mb, ml, mr | margin-top/bottom/left/right |
| mx, my | margin x축, y축 |
| p | padding |
| pt, pb, pl, pr | padding-top/bottom/left/right |
| px, py | padding x축, y축 |

---

## 8. 테마 커스터마이징

### 테마 생성
```jsx
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      {/* 앱 컴포넌트 */}
    </ThemeProvider>
  );
}
```

---

## 9. 아이콘 사용

### import 방법
```jsx
// 개별 import (권장 - 번들 크기 최적화)
import HomeIcon from '@mui/icons-material/Home';
import SettingsIcon from '@mui/icons-material/Settings';

// 사용
<HomeIcon />
<SettingsIcon color="primary" fontSize="large" />
```

### 아이콘 스타일
```jsx
<HomeIcon fontSize="small" />   // 20px
<HomeIcon fontSize="medium" />  // 24px (기본)
<HomeIcon fontSize="large" />   // 35px

<HomeIcon color="primary" />
<HomeIcon color="secondary" />
<HomeIcon color="error" />
<HomeIcon sx={{ color: '#ff5722' }} />
```

---

## 10. 자주 쓰는 패턴

### 로딩 버튼
```jsx
<Button
  variant="contained"
  disabled={loading}
  startIcon={loading ? <CircularProgress size={20} /> : <SaveIcon />}
>
  {loading ? '저장 중...' : '저장'}
</Button>
```

### 폼 레이아웃
```jsx
<Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
  <TextField label="이름" required />
  <TextField label="이메일" type="email" required />
  <Button type="submit" variant="contained">제출</Button>
</Box>
```

### 카드 그리드
```jsx
<Grid container spacing={3}>
  {items.map((item) => (
    <Grid item xs={12} sm={6} md={4} key={item.id}>
      <Card>
        <CardContent>
          <Typography>{item.title}</Typography>
        </CardContent>
      </Card>
    </Grid>
  ))}
</Grid>
```
