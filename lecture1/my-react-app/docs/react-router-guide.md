# React Router 가이드

## 1. 설치 및 기본 설정

### 설치
```bash
npm install react-router-dom
```

### 기본 설정 (main.jsx)
```jsx
import { BrowserRouter } from 'react-router-dom';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
```

---

## 2. 기본 라우팅

### Routes와 Route 설정
```jsx
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
    </Routes>
  );
}
```

### 404 페이지 처리
```jsx
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/about" element={<About />} />
  <Route path="*" element={<NotFound />} />  {/* 모든 미매칭 경로 */}
</Routes>
```

---

## 3. 네비게이션

### Link 컴포넌트
```jsx
import { Link } from 'react-router-dom';

function Navigation() {
  return (
    <nav>
      <Link to="/">홈</Link>
      <Link to="/about">소개</Link>
      <Link to="/contact">연락처</Link>
    </nav>
  );
}
```

### NavLink (활성 상태 스타일링)
```jsx
import { NavLink } from 'react-router-dom';

function Navigation() {
  return (
    <nav>
      <NavLink
        to="/"
        className={({ isActive }) => isActive ? 'active' : ''}
      >
        홈
      </NavLink>
      <NavLink
        to="/about"
        style={({ isActive }) => ({
          fontWeight: isActive ? 'bold' : 'normal'
        })}
      >
        소개
      </NavLink>
    </nav>
  );
}
```

### 프로그래밍 방식 네비게이션
```jsx
import { useNavigate } from 'react-router-dom';

function LoginButton() {
  const navigate = useNavigate();

  const handleLogin = () => {
    // 로그인 로직...
    navigate('/dashboard');        // 이동
    navigate('/dashboard', { replace: true });  // 히스토리 교체
    navigate(-1);                  // 뒤로 가기
    navigate(1);                   // 앞으로 가기
  };

  return <button onClick={handleLogin}>로그인</button>;
}
```

---

## 4. URL 파라미터

### 동적 라우트 정의
```jsx
<Routes>
  <Route path="/users/:userId" element={<UserProfile />} />
  <Route path="/posts/:postId/comments/:commentId" element={<Comment />} />
</Routes>
```

### useParams로 파라미터 접근
```jsx
import { useParams } from 'react-router-dom';

function UserProfile() {
  const { userId } = useParams();

  return <div>사용자 ID: {userId}</div>;
}
```

### 여러 파라미터
```jsx
function Comment() {
  const { postId, commentId } = useParams();

  return (
    <div>
      게시글 {postId}의 댓글 {commentId}
    </div>
  );
}
```

---

## 5. 쿼리 스트링

### useSearchParams 사용
```jsx
import { useSearchParams } from 'react-router-dom';

function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  // URL: /search?q=react&page=1
  const query = searchParams.get('q');      // "react"
  const page = searchParams.get('page');    // "1"

  // 쿼리 파라미터 설정
  const handleSearch = (newQuery) => {
    setSearchParams({ q: newQuery, page: '1' });
  };

  // 쿼리 파라미터 업데이트
  const nextPage = () => {
    setSearchParams(prev => {
      prev.set('page', String(Number(prev.get('page')) + 1));
      return prev;
    });
  };

  return (
    <div>
      <input
        value={query || ''}
        onChange={(e) => handleSearch(e.target.value)}
      />
      <button onClick={nextPage}>다음 페이지</button>
    </div>
  );
}
```

---

## 6. 중첩 라우트

### 레이아웃 패턴
```jsx
// App.jsx
<Routes>
  <Route path="/" element={<Layout />}>
    <Route index element={<Home />} />           {/* / */}
    <Route path="about" element={<About />} />   {/* /about */}
    <Route path="users" element={<Users />}>     {/* /users */}
      <Route index element={<UserList />} />     {/* /users */}
      <Route path=":id" element={<UserDetail />} /> {/* /users/:id */}
    </Route>
  </Route>
</Routes>
```

### Outlet 사용
```jsx
import { Outlet } from 'react-router-dom';

function Layout() {
  return (
    <div>
      <header>
        <Navigation />
      </header>
      <main>
        <Outlet />  {/* 자식 라우트가 여기에 렌더링됨 */}
      </main>
      <footer>Footer</footer>
    </div>
  );
}
```

### 중첩 레이아웃
```jsx
function Users() {
  return (
    <div>
      <h1>사용자 관리</h1>
      <nav>
        <Link to="/users">목록</Link>
        <Link to="/users/new">새 사용자</Link>
      </nav>
      <Outlet />  {/* UserList 또는 UserDetail */}
    </div>
  );
}
```

---

## 7. 보호된 라우트 (Protected Routes)

### 인증 체크 컴포넌트
```jsx
import { Navigate, Outlet, useLocation } from 'react-router-dom';

function ProtectedRoute({ isAuthenticated }) {
  const location = useLocation();

  if (!isAuthenticated) {
    // 로그인 후 원래 페이지로 리다이렉트하기 위해 현재 위치 저장
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
}
```

### 라우트에 적용
```jsx
<Routes>
  <Route path="/login" element={<Login />} />
  <Route path="/" element={<Layout />}>
    <Route index element={<Home />} />

    {/* 보호된 라우트 */}
    <Route element={<ProtectedRoute isAuthenticated={isLoggedIn} />}>
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="profile" element={<Profile />} />
      <Route path="settings" element={<Settings />} />
    </Route>
  </Route>
</Routes>
```

### 로그인 후 리다이렉트
```jsx
function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/';

  const handleLogin = async () => {
    // 로그인 로직...
    navigate(from, { replace: true });
  };

  return <button onClick={handleLogin}>로그인</button>;
}
```

---

## 8. 유용한 Hooks

### useLocation
```jsx
import { useLocation } from 'react-router-dom';

function CurrentPath() {
  const location = useLocation();

  console.log(location.pathname);  // "/about"
  console.log(location.search);    // "?q=test"
  console.log(location.hash);      // "#section1"
  console.log(location.state);     // 전달된 state

  return <div>현재 경로: {location.pathname}</div>;
}
```

### useMatch
```jsx
import { useMatch } from 'react-router-dom';

function NavItem({ to, children }) {
  const match = useMatch(to);

  return (
    <Link
      to={to}
      style={{ fontWeight: match ? 'bold' : 'normal' }}
    >
      {children}
    </Link>
  );
}
```

---

## 9. 데이터 로딩 패턴

### 컴포넌트 내 데이터 로딩
```jsx
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

function UserProfile() {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/users/${userId}`)
      .then(res => res.json())
      .then(data => {
        setUser(data);
        setLoading(false);
      });
  }, [userId]);

  if (loading) return <div>로딩 중...</div>;
  if (!user) return <div>사용자를 찾을 수 없습니다</div>;

  return <div>{user.name}</div>;
}
```

---

## 10. 실전 예제: 완전한 라우팅 구조

### 프로젝트 구조
```
src/
├── pages/
│   ├── Home.jsx
│   ├── About.jsx
│   ├── Login.jsx
│   ├── Dashboard.jsx
│   └── NotFound.jsx
├── components/
│   ├── Layout.jsx
│   ├── Navigation.jsx
│   └── ProtectedRoute.jsx
├── App.jsx
└── main.jsx
```

### main.jsx
```jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
```

### App.jsx
```jsx
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import About from './pages/About';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import NotFound from './pages/NotFound';
import { useAuth } from './hooks/useAuth';

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="login" element={<Login />} />

        <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
          <Route path="dashboard" element={<Dashboard />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
```

### Layout.jsx
```jsx
import { Outlet } from 'react-router-dom';
import Navigation from './Navigation';

function Layout() {
  return (
    <div>
      <Navigation />
      <main style={{ padding: '20px' }}>
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
```

### Navigation.jsx
```jsx
import { NavLink } from 'react-router-dom';

const navStyle = {
  display: 'flex',
  gap: '20px',
  padding: '20px',
  backgroundColor: '#f0f0f0'
};

function Navigation() {
  return (
    <nav style={navStyle}>
      <NavLink to="/" end>홈</NavLink>
      <NavLink to="/about">소개</NavLink>
      <NavLink to="/dashboard">대시보드</NavLink>
      <NavLink to="/login">로그인</NavLink>
    </nav>
  );
}

export default Navigation;
```
