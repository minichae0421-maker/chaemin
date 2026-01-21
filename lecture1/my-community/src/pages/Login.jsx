import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'

function Login() {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  // 로그인 처리
  const handleLogin = async (e) => {
    e.preventDefault()
    setError('')

    // 아이디와 비밀번호로 사용자 확인
    const { data, error: fetchError } = await supabase
      .from('users')
      .select('*')
      .eq('username', username)
      .eq('password', password)
      .single()

    if (fetchError || !data) {
      setError('아이디 또는 비밀번호가 올바르지 않습니다.')
      return
    }

    // 로그인 성공 - 로컬 스토리지에 사용자 정보 저장
    localStorage.setItem('user', JSON.stringify(data))
    navigate('/board')
  }

  return (
    <div className="login-container">
      <div className="login-box">
        {/* 로고 */}
        <div className="logo">
          <span className="logo-icon">✨</span>
          <h1>ShineMarket</h1>
        </div>

        <h2>로그인</h2>

        {error && <p className="error-message">{error}</p>}

        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label>아이디</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="아이디를 입력하세요"
              required
            />
          </div>

          <div className="input-group">
            <label>비밀번호</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호를 입력하세요"
              required
            />
          </div>

          <button type="submit" className="btn-primary">
            로그인
          </button>
        </form>

        <Link to="/signup" className="signup-link">
          회원가입하러 가기
        </Link>
      </div>
    </div>
  )
}

export default Login
