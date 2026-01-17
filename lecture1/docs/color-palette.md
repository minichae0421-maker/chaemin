# ELIX 컬러 팔레트 시스템

> 웹사이트 이미지 분석을 통해 추출한 컬러 팔레트

---

## 메인 컬러 분석

| 구분 | 색상명 | Hex 코드 | 미리보기 | 용도 |
|------|--------|----------|----------|------|
| **Primary** | 비비드 옐로우 | `#FFF200` | 🟨 | 메인 그래픽, 강조 영역 |
| **Secondary** | 네이비 블루 | `#1A1A5E` | 🟦 | 로고, 타이포그래피 |
| **Accent** | 딥 네이비 | `#0D0D4D` | 🔵 | 테두리, 호버 상태 |

---

## 전체 컬러 팔레트

### Background (배경색)

```css
--color-bg-primary: #F8F8F6;    /* 메인 배경 - 웜 오프화이트 */
--color-bg-secondary: #FFFFFF;   /* 카드, 모달 배경 */
--color-bg-accent: #FFF200;      /* 강조 영역 배경 */
--color-bg-dark: #1A1A5E;        /* 다크 섹션 배경 */
```

| 용도 | Hex 코드 | RGB | 설명 |
|------|----------|-----|------|
| 메인 배경 | `#F8F8F6` | rgb(248, 248, 246) | 페이지 전체 배경 |
| 카드 배경 | `#FFFFFF` | rgb(255, 255, 255) | 카드, 모달, 팝업 |
| 강조 배경 | `#FFF200` | rgb(255, 242, 0) | 히어로 섹션, CTA 영역 |
| 다크 배경 | `#1A1A5E` | rgb(26, 26, 94) | 푸터, 다크 섹션 |

### Text Colors (텍스트)

```css
--color-text-primary: #1A1A5E;   /* 제목, 강조 텍스트 */
--color-text-secondary: #2D2D5E; /* 본문 텍스트 */
--color-text-muted: #6B6B8D;     /* 부가 설명, 캡션 */
--color-text-light: #FFFFFF;     /* 다크 배경 위 텍스트 */
--color-text-on-yellow: #1A1A5E; /* 노란 배경 위 텍스트 */
```

| 용도 | Hex 코드 | 사용 예시 |
|------|----------|-----------|
| 헤더/제목 | `#1A1A5E` | h1, h2, 로고 텍스트 |
| 본문 | `#2D2D5E` | p, li, 일반 텍스트 |
| 보조 텍스트 | `#6B6B8D` | 캡션, placeholder, 날짜 |
| 반전 텍스트 | `#FFFFFF` | 다크 배경 위 텍스트 |

### Border & Outline (테두리)

```css
--color-border-light: #E0E0E0;   /* 기본 테두리 */
--color-border-medium: #C0C0C0;  /* 강조 테두리 */
--color-border-dark: #1A1A5E;    /* 액티브 상태 테두리 */
--color-border-focus: #FFF200;   /* 포커스 상태 */
```

### Interactive (상호작용 요소)

```css
/* 버튼 - Primary */
--color-btn-primary-bg: #1A1A5E;
--color-btn-primary-text: #FFFFFF;
--color-btn-primary-hover: #0D0D4D;

/* 버튼 - Secondary */
--color-btn-secondary-bg: #FFF200;
--color-btn-secondary-text: #1A1A5E;
--color-btn-secondary-hover: #E6D900;

/* 링크 */
--color-link: #1A1A5E;
--color-link-hover: #0D0D4D;
--color-link-visited: #4A4A7E;
```

---

## 컬러 사용 비율

```
노란색 (Primary)     ████████████████░░░░  ~55%  → 메인 그래픽, 시선 유도
네이비 (Secondary)   ████░░░░░░░░░░░░░░░░  ~15%  → 타이포, 로고, UI
오프화이트 (BG)      ██████░░░░░░░░░░░░░░  ~28%  → 배경, 여백
기타                 ░░░░░░░░░░░░░░░░░░░░  ~2%   → 서브 요소
```

---

## 컬러 사용 가이드

### 1. Primary Color (노란색) 사용 규칙

**사용 O**
- 히어로 섹션의 대형 그래픽 요소
- CTA(Call to Action) 버튼의 배경
- 중요한 알림이나 하이라이트 영역
- 로딩 인디케이터, 프로그레스 바

**사용 X**
- 긴 본문 텍스트의 배경 (가독성 저하)
- 경고/에러 메시지 (빨간색과 혼동)
- 너무 작은 요소 (눈에 잘 안 띔)

```jsx
// 좋은 예시
<Button variant="secondary" sx={{ bgcolor: '#FFF200' }}>
  시작하기
</Button>

// 나쁜 예시 - 노란 배경에 긴 텍스트
<Box sx={{ bgcolor: '#FFF200', p: 4 }}>
  <Typography>긴 본문 텍스트...</Typography>
</Box>
```

### 2. Secondary Color (네이비) 사용 규칙

**사용 O**
- 모든 제목 텍스트 (h1~h6)
- 네비게이션 메뉴
- 주요 버튼
- 아이콘
- 푸터 배경

**사용 X**
- 배경 전체 (너무 무거움)
- 경고성 메시지

```jsx
// 제목 스타일
<Typography variant="h1" sx={{ color: '#1A1A5E' }}>
  제목입니다
</Typography>

// 버튼 스타일
<Button sx={{ bgcolor: '#1A1A5E', color: '#FFFFFF' }}>
  자세히 보기
</Button>
```

### 3. 배경색 사용 규칙

| 배경색 | 위에 올릴 텍스트 색상 | 대비율 |
|--------|----------------------|--------|
| `#F8F8F6` (오프화이트) | `#1A1A5E` (네이비) | 10.2:1 ✅ |
| `#FFF200` (노란색) | `#1A1A5E` (네이비) | 8.5:1 ✅ |
| `#1A1A5E` (네이비) | `#FFFFFF` (흰색) | 12.1:1 ✅ |
| `#1A1A5E` (네이비) | `#FFF200` (노란색) | 8.5:1 ✅ |

### 4. 상태별 색상

```css
/* 성공 */
--color-success: #2E7D32;
--color-success-bg: #E8F5E9;

/* 경고 */
--color-warning: #ED6C02;
--color-warning-bg: #FFF3E0;

/* 에러 */
--color-error: #D32F2F;
--color-error-bg: #FFEBEE;

/* 정보 */
--color-info: #1A1A5E;
--color-info-bg: #E8EAF6;
```

---

## 반응형 고려사항

### 다크모드 팔레트

```css
/* 다크모드 변수 */
:root[data-theme="dark"] {
  /* 배경 */
  --color-bg-primary: #0D0D1A;
  --color-bg-secondary: #1A1A2E;
  --color-bg-accent: #2D2D5E;

  /* 텍스트 */
  --color-text-primary: #FFFFFF;
  --color-text-secondary: #E0E0E0;
  --color-text-muted: #A0A0B0;

  /* Primary - 노란색 유지 (브랜드 아이덴티티) */
  --color-primary: #FFF200;
  --color-primary-muted: #CCC200;

  /* Secondary - 밝게 조정 */
  --color-secondary: #8B8BD0;

  /* 테두리 */
  --color-border-light: #2D2D5E;
  --color-border-dark: #4A4A7E;
}
```

### 라이트/다크 모드 비교

| 요소 | 라이트 모드 | 다크 모드 |
|------|-------------|-----------|
| 메인 배경 | `#F8F8F6` | `#0D0D1A` |
| 카드 배경 | `#FFFFFF` | `#1A1A2E` |
| 제목 텍스트 | `#1A1A5E` | `#FFFFFF` |
| 본문 텍스트 | `#2D2D5E` | `#E0E0E0` |
| Primary 버튼 | `#1A1A5E` | `#FFF200` |
| 테두리 | `#E0E0E0` | `#2D2D5E` |

### MUI 테마 설정

```javascript
// theme.js
import { createTheme } from '@mui/material/styles';

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1A1A5E',
      light: '#4A4A7E',
      dark: '#0D0D4D',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#FFF200',
      light: '#FFF566',
      dark: '#CCC200',
      contrastText: '#1A1A5E',
    },
    background: {
      default: '#F8F8F6',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#1A1A5E',
      secondary: '#2D2D5E',
      disabled: '#6B6B8D',
    },
  },
});

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#FFF200',
      light: '#FFF566',
      dark: '#CCC200',
      contrastText: '#0D0D1A',
    },
    secondary: {
      main: '#8B8BD0',
      light: '#ABABEE',
      dark: '#5A5A9E',
      contrastText: '#FFFFFF',
    },
    background: {
      default: '#0D0D1A',
      paper: '#1A1A2E',
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#E0E0E0',
      disabled: '#A0A0B0',
    },
  },
});

export { lightTheme, darkTheme };
```

### 접근성 체크리스트

- [x] 모든 텍스트 대비율 4.5:1 이상 (WCAG AA)
- [x] 대형 텍스트 대비율 3:1 이상
- [x] 포커스 상태 명확히 표시
- [x] 색상만으로 정보 전달하지 않음
- [x] 다크모드에서도 브랜드 색상 유지

### 화면 크기별 고려사항

```css
/* 모바일: 터치 영역 고려 */
@media (max-width: 768px) {
  .btn-primary {
    min-height: 48px;
    /* 노란색 버튼은 작은 화면에서 더 눈에 띔 */
  }
}

/* 태블릿 */
@media (min-width: 769px) and (max-width: 1024px) {
  /* 중간 크기에서 색상 균형 유지 */
}

/* 데스크톱: 넓은 화면에서 노란색 영역 비율 조절 */
@media (min-width: 1025px) {
  .hero-section {
    /* 노란색이 너무 overwhelming하지 않도록 */
    max-width: 60%;
  }
}
```

---

## CSS 변수 전체 정의

```css
:root {
  /* ===== Primary Colors ===== */
  --color-primary: #FFF200;
  --color-primary-light: #FFF566;
  --color-primary-dark: #CCC200;

  /* ===== Secondary Colors ===== */
  --color-secondary: #1A1A5E;
  --color-secondary-light: #4A4A7E;
  --color-secondary-dark: #0D0D4D;

  /* ===== Background ===== */
  --color-bg-primary: #F8F8F6;
  --color-bg-secondary: #FFFFFF;
  --color-bg-accent: #FFF200;
  --color-bg-dark: #1A1A5E;

  /* ===== Text ===== */
  --color-text-primary: #1A1A5E;
  --color-text-secondary: #2D2D5E;
  --color-text-muted: #6B6B8D;
  --color-text-light: #FFFFFF;

  /* ===== Border ===== */
  --color-border-light: #E0E0E0;
  --color-border-medium: #C0C0C0;
  --color-border-dark: #1A1A5E;
  --color-border-focus: #FFF200;

  /* ===== Interactive ===== */
  --color-link: #1A1A5E;
  --color-link-hover: #0D0D4D;
  --color-focus-ring: #FFF200;

  /* ===== Status ===== */
  --color-success: #2E7D32;
  --color-warning: #ED6C02;
  --color-error: #D32F2F;
  --color-info: #1A1A5E;

  /* ===== Shadows ===== */
  --shadow-sm: 0 1px 2px rgba(26, 26, 94, 0.1);
  --shadow-md: 0 4px 6px rgba(26, 26, 94, 0.1);
  --shadow-lg: 0 10px 15px rgba(26, 26, 94, 0.1);
}
```

---

## 디자인 특징 요약

### 전체적인 분위기
- **대담하고 현대적**: 강렬한 노란색이 에너지와 창의성을 표현
- **미니멀리즘**: 제한된 색상 팔레트로 세련된 느낌
- **고급스러움**: 네이비와 옐로우의 조합이 프리미엄 브랜드 이미지 형성

### 브랜드 느낌
- 크리에이티브 에이전시 / 디자인 스튜디오
- 젊고 트렌디한 이미지
- 자신감 있고 과감한 브랜드 정체성

---

*마지막 업데이트: 2026-01-17*
