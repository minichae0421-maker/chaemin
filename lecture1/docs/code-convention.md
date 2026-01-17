# 코드 컨벤션

## 파일 명명 규칙
- 컴포넌트: `PascalCase.jsx` (예: `UserProfile.jsx`)
- 훅: `useCamelCase.js` (예: `useAuth.js`)
- 유틸: `camelCase.js` (예: `formatDate.js`)

## 컴포넌트 구조
```jsx
// 1. 임포트
import { useState } from 'react';
import { Box } from '@mui/material';

// 2. 컴포넌트 정의
function ComponentName({ prop1, prop2 }) {
  // 3. 상태 & 훅
  const [state, setState] = useState(null);

  // 4. 핸들러
  const handleClick = () => {};

  // 5. 렌더링
  return (
    <Box>내용</Box>
  );
}

// 6. 익스포트
export default ComponentName;
```

## 폴더 구조
```
src/
├── components/    # 재사용 컴포넌트
├── pages/         # 페이지 컴포넌트
├── hooks/         # 커스텀 훅
├── utils/         # 유틸 함수
└── assets/        # 이미지, 폰트 등
```
