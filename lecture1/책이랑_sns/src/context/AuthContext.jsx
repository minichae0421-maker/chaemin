// 인증 상태 관리 컨텍스트
import { createContext, useContext, useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // 로컬 스토리지에서 사용자 정보 복원
    const savedUser = localStorage.getItem('bookrang_user')
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    setLoading(false)
  }, [])

  // 로그인 함수
  const login = async (username, password) => {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('username', username)
      .eq('password', password)
      .single()

    if (error || !data) {
      throw new Error('아이디 또는 비밀번호가 올바르지 않습니다.')
    }

    setUser(data)
    localStorage.setItem('bookrang_user', JSON.stringify(data))
    return data
  }

  // 회원가입 함수
  const signup = async (username, password, nickname, email) => {
    // 중복 확인
    const { data: existing } = await supabase
      .from('users')
      .select('id')
      .eq('username', username)
      .single()

    if (existing) {
      throw new Error('이미 사용 중인 아이디입니다.')
    }

    const { data, error } = await supabase
      .from('users')
      .insert([{
        username,
        password,
        nickname,
        email,
        display_name: nickname
      }])
      .select()
      .single()

    if (error) {
      throw new Error('회원가입에 실패했습니다.')
    }

    setUser(data)
    localStorage.setItem('bookrang_user', JSON.stringify(data))
    return data
  }

  // 로그아웃 함수
  const logout = () => {
    setUser(null)
    localStorage.removeItem('bookrang_user')
  }

  const value = {
    user,
    loading,
    login,
    signup,
    logout,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
