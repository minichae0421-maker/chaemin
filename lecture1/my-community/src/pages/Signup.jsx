import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'

function Signup() {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [nickname, setNickname] = useState('')
  const [error, setError] = useState('')
  const [isUsernameChecked, setIsUsernameChecked] = useState(false)
  const [usernameAvailable, setUsernameAvailable] = useState(false)

  // 비밀번호 규칙 체크
  const passwordRules = {
    length: password.length >= 8,
    number: /\d/.test(password),
    special: /[!@#$%^&*]/.test(password)
  }
  const isPasswordValid = passwordRules.length && passwordRules.number && passwordRules.special

  // 아이디 중복 확인
  const checkUsername = async () => {
    if (!username) {
      setError('아이디를 입력하세요.')
      return
    }

    const { data } = await supabase
      .from('users')
      .select('id')
      .eq('username', username)
      .single()

    if (data) {
      setError('이미 사용중인 아이디입니다.')
      setUsernameAvailable(false)
    } else {
      setError('')
      setUsernameAvailable(true)
      alert('사용 가능한 아이디입니다!')
    }
    setIsUsernameChecked(true)
  }

  // 회원가입 처리
  const handleSignup = async (e) => {
    e.preventDefault()
    setError('')

    if (!isUsernameChecked || !usernameAvailable) {
      setError('아이디 중복확인을 해주세요.')
      return
    }

    if (!isPasswordValid) {
      setError('비밀번호 규칙을 확인해주세요.')
      return
    }

    // 회원 등록
    const { error: insertError } = await supabase
      .from('users')
      .insert([{ username, password, nickname }])

    if (insertError) {
      setError('회원가입에 실패했습니다. 다시 시도해주세요.')
      return
    }

    alert('회원가입이 완료되었습니다!')
    navigate('/')
  }

  return (
    <div className="signup-container">
      <div className="signup-box">
        <h2>회원가입</h2>

        {error && <p className="error-message">{error}</p>}

        <form onSubmit={handleSignup}>
          <div className="input-group">
            <label>아이디</label>
            <div className="input-with-button">
              <input
                type="text"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value)
                  setIsUsernameChecked(false)
                  setUsernameAvailable(false)
                }}
                placeholder="아이디를 입력하세요"
                required
              />
              <button type="button" onClick={checkUsername} className="btn-check">
                중복확인
              </button>
            </div>
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
            <div className={`password-rules ${password ? 'active' : ''}`}>
              <p className={passwordRules.length ? 'valid' : 'invalid'}>
                {passwordRules.length ? '✓' : '○'} 8자 이상
              </p>
              <p className={passwordRules.number ? 'valid' : 'invalid'}>
                {passwordRules.number ? '✓' : '○'} 숫자 포함
              </p>
              <p className={passwordRules.special ? 'valid' : 'invalid'}>
                {passwordRules.special ? '✓' : '○'} 특수문자 포함 (!@#$%^&*)
              </p>
            </div>
          </div>

          <div className="input-group">
            <label>닉네임</label>
            <input
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              placeholder="닉네임을 입력하세요"
              required
            />
          </div>

          <button type="submit" className="btn-primary">
            가입하기
          </button>
        </form>

        <Link to="/" className="login-link">
          로그인으로 돌아가기
        </Link>
      </div>
    </div>
  )
}

export default Signup
