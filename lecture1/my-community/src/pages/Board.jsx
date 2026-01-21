import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'

function Board() {
  const navigate = useNavigate()
  const [posts, setPosts] = useState([])
  const [user, setUser] = useState(null)

  useEffect(() => {
    // 로그인 확인
    const userData = localStorage.getItem('user')
    if (!userData) {
      navigate('/')
      return
    }
    setUser(JSON.parse(userData))
    fetchPosts()
  }, [navigate])

  // 게시물 목록 조회
  const fetchPosts = async () => {
    const { data: postsData } = await supabase
      .from('posts')
      .select(`
        *,
        users:author_id (nickname),
        likes (id),
        comments (id)
      `)
      .order('created_at', { ascending: false })

    if (postsData) {
      setPosts(postsData)
    }
  }

  // 로그아웃
  const handleLogout = () => {
    localStorage.removeItem('user')
    navigate('/')
  }

  // 날짜 포맷
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  // 가격 포맷
  const formatPrice = (price) => {
    return price.toLocaleString('ko-KR') + '원'
  }

  return (
    <div className="board-container">
      <div className="board-header">
        <h1>✨ ShineMarket</h1>
        <div className="user-info">
          <span>{user?.nickname}님 환영해요!</span>
          <button onClick={handleLogout} className="btn-logout">
            로그아웃
          </button>
        </div>
      </div>

      <div className="board-actions">
        <Link to="/write" className="btn-write">
          + 게시물 추가
        </Link>
      </div>

      <div className="posts-list">
        {posts.length === 0 ? (
          <p className="no-posts">아직 게시물이 없습니다. 첫 번째 게시물을 작성해보세요!</p>
        ) : (
          posts.map((post) => (
            <Link to={`/post/${post.id}`} key={post.id} className="post-card">
              <div className="post-main">
                <h3 className="post-title">{post.title}</h3>
                <p className="post-price">{formatPrice(post.price)}</p>
              </div>
              <div className="post-info">
                <span className="post-author">{post.users?.nickname || '익명'}</span>
                <span className="post-date">{formatDate(post.created_at)}</span>
              </div>
              {post.hashtags && post.hashtags.length > 0 && (
                <div className="post-hashtags">
                  {post.hashtags.map((tag, index) => (
                    <span key={index} className="hashtag">#{tag}</span>
                  ))}
                </div>
              )}
              <div className="post-stats">
                <span>👁 {post.view_count}</span>
                <span>❤️ {post.likes?.length || 0}</span>
                <span>💬 {post.comments?.length || 0}</span>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  )
}

export default Board
