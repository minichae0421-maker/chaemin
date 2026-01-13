# React 베스트 프랙티스

## 1. 프로젝트 구조

### 권장 폴더 구조
```
src/
├── components/          # 재사용 가능한 UI 컴포넌트
│   ├── common/          # 공통 컴포넌트 (Button, Input 등)
│   ├── layout/          # 레이아웃 컴포넌트 (Header, Footer 등)
│   └── features/        # 기능별 컴포넌트
├── pages/               # 페이지 컴포넌트 (라우트별)
├── hooks/               # 커스텀 훅
├── contexts/            # React Context
├── services/            # API 호출 함수
├── utils/               # 유틸리티 함수
├── constants/           # 상수 정의
├── styles/              # 글로벌 스타일
└── types/               # TypeScript 타입 정의
```

### 컴포넌트 파일 구조
```
components/
└── Button/
    ├── Button.jsx       # 컴포넌트
    ├── Button.styles.js # 스타일 (선택)
    └── index.js         # export
```

---

## 2. 컴포넌트 설계 원칙

### 단일 책임 원칙
```jsx
// Bad - 너무 많은 책임
function UserDashboard() {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  // 사용자, 게시글, 댓글 모두 처리...
}

// Good - 책임 분리
function UserDashboard() {
  return (
    <div>
      <UserProfile />
      <UserPosts />
      <UserComments />
    </div>
  );
}
```

### Props는 최소화
```jsx
// Bad - 너무 많은 props
<UserCard
  name={user.name}
  email={user.email}
  avatar={user.avatar}
  phone={user.phone}
  address={user.address}
/>

// Good - 객체로 전달
<UserCard user={user} />
```

### 컴포넌트 크기 제한
- 한 파일에 200줄 이하 권장
- 복잡해지면 작은 컴포넌트로 분리

---

## 3. State 관리

### State 최소화
```jsx
// Bad - 파생 데이터를 state로 관리
const [items, setItems] = useState([]);
const [itemCount, setItemCount] = useState(0);  // 불필요

// Good - 파생 데이터는 계산
const [items, setItems] = useState([]);
const itemCount = items.length;  // 계산으로 처리
```

### State 위치 결정
```jsx
// 1. 한 컴포넌트만 사용 → 해당 컴포넌트에 state
// 2. 형제 컴포넌트가 공유 → 부모로 끌어올림 (lifting state up)
// 3. 여러 곳에서 사용 → Context 또는 상태 관리 라이브러리
```

### 불변성 유지
```jsx
// Bad - 직접 수정
const addItem = (item) => {
  items.push(item);  // 원본 배열 수정
  setItems(items);
};

// Good - 새 배열 생성
const addItem = (item) => {
  setItems([...items, item]);
};

// 객체 업데이트
const updateUser = (field, value) => {
  setUser({ ...user, [field]: value });
};

// 중첩 객체 업데이트
const updateAddress = (city) => {
  setUser({
    ...user,
    address: { ...user.address, city }
  });
};
```

---

## 4. useEffect 올바른 사용

### 의존성 배열 정확히 지정
```jsx
// Bad - 의존성 누락
useEffect(() => {
  fetchUser(userId);
}, []);  // userId 변경 시 반영 안됨

// Good
useEffect(() => {
  fetchUser(userId);
}, [userId]);
```

### 클린업 함수 사용
```jsx
useEffect(() => {
  const subscription = subscribeToData(id);

  // 클린업: 컴포넌트 언마운트 또는 의존성 변경 시 실행
  return () => {
    subscription.unsubscribe();
  };
}, [id]);
```

### useEffect가 필요 없는 경우
```jsx
// Bad - 불필요한 useEffect
const [firstName, setFirstName] = useState('');
const [lastName, setLastName] = useState('');
const [fullName, setFullName] = useState('');

useEffect(() => {
  setFullName(`${firstName} ${lastName}`);
}, [firstName, lastName]);

// Good - 렌더링 중 계산
const [firstName, setFirstName] = useState('');
const [lastName, setLastName] = useState('');
const fullName = `${firstName} ${lastName}`;
```

---

## 5. 성능 최적화

### React.memo로 불필요한 리렌더링 방지
```jsx
// props가 변경되지 않으면 리렌더링 건너뜀
const UserCard = React.memo(function UserCard({ user }) {
  return <div>{user.name}</div>;
});
```

### useMemo로 비용이 큰 계산 캐싱
```jsx
function FilteredList({ items, filter }) {
  // items나 filter가 변경될 때만 재계산
  const filteredItems = useMemo(() => {
    return items.filter(item => item.name.includes(filter));
  }, [items, filter]);

  return <List items={filteredItems} />;
}
```

### useCallback으로 함수 참조 유지
```jsx
function Parent() {
  const [count, setCount] = useState(0);

  // count가 변경되어도 함수 참조 유지
  const handleClick = useCallback(() => {
    console.log('clicked');
  }, []);

  return <MemoizedChild onClick={handleClick} />;
}
```

### 리스트 렌더링 최적화
```jsx
// Good - 고유하고 안정적인 key 사용
{items.map(item => (
  <ListItem key={item.id} item={item} />
))}

// Bad - index를 key로 사용 (순서 변경 시 문제)
{items.map((item, index) => (
  <ListItem key={index} item={item} />
))}
```

---

## 6. 커스텀 훅

### 로직 재사용
```jsx
// hooks/useLocalStorage.js
function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}

// 사용
const [theme, setTheme] = useLocalStorage('theme', 'light');
```

### API 호출 훅
```jsx
// hooks/useFetch.js
function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchData() {
      try {
        setLoading(true);
        const response = await fetch(url);
        const json = await response.json();
        if (!cancelled) {
          setData(json);
          setError(null);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    fetchData();

    return () => {
      cancelled = true;
    };
  }, [url]);

  return { data, loading, error };
}

// 사용
const { data: user, loading, error } = useFetch('/api/user/1');
```

### 토글 훅
```jsx
function useToggle(initialValue = false) {
  const [value, setValue] = useState(initialValue);

  const toggle = useCallback(() => {
    setValue(v => !v);
  }, []);

  return [value, toggle];
}

// 사용
const [isOpen, toggleOpen] = useToggle();
```

---

## 7. 조건부 렌더링

### 논리 AND (&&) 연산자
```jsx
{isLoggedIn && <UserMenu />}

// 주의: 0은 falsy지만 렌더링됨
{count && <span>{count}</span>}  // count가 0이면 "0" 출력
{count > 0 && <span>{count}</span>}  // 올바른 방법
```

### 삼항 연산자
```jsx
{isLoading ? <Spinner /> : <Content />}
```

### 즉시 반환
```jsx
function UserProfile({ user }) {
  if (!user) {
    return <div>로그인이 필요합니다</div>;
  }

  return <div>{user.name}</div>;
}
```

---

## 8. 이벤트 핸들링

### 네이밍 규칙
```jsx
// props: on + 동사 (onSubmit, onClick, onChange)
// 핸들러: handle + 동사 (handleSubmit, handleClick, handleChange)

function Form({ onSubmit }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(data);
  };

  return <form onSubmit={handleSubmit}>...</form>;
}
```

### 인라인 함수 피하기
```jsx
// Bad - 매 렌더마다 새 함수 생성
<button onClick={() => handleDelete(item.id)}>삭제</button>

// Good - useCallback 또는 별도 컴포넌트
const handleDelete = useCallback((id) => {
  deleteItem(id);
}, []);

// 또는 별도 컴포넌트로 분리
function DeleteButton({ id, onDelete }) {
  return <button onClick={() => onDelete(id)}>삭제</button>;
}
```

---

## 9. 폼 처리

### 제어 컴포넌트
```jsx
function Form() {
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="name"
        value={formData.name}
        onChange={handleChange}
      />
      <input
        name="email"
        value={formData.email}
        onChange={handleChange}
      />
      <button type="submit">제출</button>
    </form>
  );
}
```

### 유효성 검사
```jsx
const [errors, setErrors] = useState({});

const validate = () => {
  const newErrors = {};

  if (!formData.name) {
    newErrors.name = '이름을 입력해주세요';
  }

  if (!formData.email.includes('@')) {
    newErrors.email = '유효한 이메일을 입력해주세요';
  }

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};

const handleSubmit = (e) => {
  e.preventDefault();
  if (validate()) {
    // 제출 로직
  }
};
```

---

## 10. 에러 처리

### Error Boundary
```jsx
class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>문제가 발생했습니다.</h1>;
    }

    return this.props.children;
  }
}

// 사용
<ErrorBoundary>
  <App />
</ErrorBoundary>
```

### API 에러 처리
```jsx
function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(`/api/users/${userId}`);

        if (!response.ok) {
          throw new Error('사용자를 찾을 수 없습니다');
        }

        const data = await response.json();
        setUser(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, [userId]);

  if (loading) return <Spinner />;
  if (error) return <ErrorMessage message={error} />;
  if (!user) return null;

  return <div>{user.name}</div>;
}
```

---

## 11. 접근성 (Accessibility)

### 시맨틱 HTML
```jsx
// Bad
<div onClick={handleClick}>클릭</div>

// Good
<button onClick={handleClick}>클릭</button>
```

### ARIA 속성
```jsx
<button
  aria-label="메뉴 열기"
  aria-expanded={isOpen}
  onClick={toggleMenu}
>
  <MenuIcon />
</button>
```

### 키보드 네비게이션
```jsx
<div
  role="button"
  tabIndex={0}
  onClick={handleClick}
  onKeyDown={(e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      handleClick();
    }
  }}
>
  클릭 가능한 영역
</div>
```

---

## 12. 타입 안전성 (PropTypes)

### PropTypes 사용
```jsx
import PropTypes from 'prop-types';

function UserCard({ user, onEdit, isAdmin }) {
  return (
    <div>
      <h2>{user.name}</h2>
      {isAdmin && <button onClick={onEdit}>편집</button>}
    </div>
  );
}

UserCard.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string
  }).isRequired,
  onEdit: PropTypes.func,
  isAdmin: PropTypes.bool
};

UserCard.defaultProps = {
  isAdmin: false,
  onEdit: () => {}
};
```

---

## 요약: 핵심 체크리스트

1. **컴포넌트는 작고 단일 책임**
2. **State는 최소화, 파생 데이터는 계산**
3. **불변성 유지 (새 객체/배열 생성)**
4. **useEffect 의존성 배열 정확히**
5. **성능: memo, useMemo, useCallback 적절히**
6. **커스텀 훅으로 로직 재사용**
7. **에러 바운더리로 오류 격리**
8. **접근성 고려**
