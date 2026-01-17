# 새 프로젝트 생성 가이드

## 빠른 시작

### 1. Vite로 React 프로젝트 생성
```bash
npm create vite@latest 프로젝트명 -- --template react
cd 프로젝트명
npm install
```

### 2. MUI 설치
```bash
npm install @mui/material @emotion/react @emotion/styled @mui/icons-material
```

### 3. React Router 설치
```bash
npm install react-router-dom
```

## 템플릿 사용법
`_template_settings` 폴더의 파일들을 복사해서 사용:

1. `package.json` - 의존성 목록
2. `vite.config.js` - Vite 설정
3. `src/theme.js` - MUI 테마
4. `src/main.jsx` - ThemeProvider 적용
5. `src/App.jsx` - 기본 앱 구조

## 개발 서버 실행
```bash
npm run dev
```
브라우저에서 http://localhost:5173 접속
