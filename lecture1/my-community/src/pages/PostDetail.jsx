import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'

function PostDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [post, setPost] = useState(null)
  const [comments, setComments] = useState([])
  const [newComment, setNewComment] = useState('')
  const [user, setUser] = useState(null)
  const [isLiked, setIsLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(0)

  useEffect(() => {
    // 로그인 확인
    const userData = localStorage.getItem('user')
    if (!userData) {
      navigate('/')
      return
    }
    setUser(JSON.parse(userData))
    fetchPost()
    fetchComments()
  }, [id, navigate])

  useEffect(() => {
    if (user && post) {
      checkLikeStatus()
    }
  }, [user, post])

  // 게시물 조회
  const fetchPost = async () => {
    try {
      // 먼저 게시물 조회
      const { data, error } = await supabase
        .from('posts')
        .select(`
          *,
          users:author_id (nickname),
          likes (id)
        `)
        .eq('id', id)
        .single()

      if (error) {
        console.error('게시물 조회 에러:', error)
        return
      }

      if (data) {
        setPost(data)
        setLikeCount(data.likes?.length || 0)

        // 조회수 증가 (백그라운드에서 처리)
        supabase
          .from('posts')
          .update({ view_count: (data.view_count || 0) + 1 })
          .eq('id', id)
          .then()
      }
    } catch (err) {
      console.error('에러:', err)
    }
  }

  // 댓글 조회
  const fetchComments = async () => {
    const { data } = await supabase
      .from('comments')
      .select(`
        *,
        users:author_id (nickname)
      `)
      .eq('post_id', id)
      .order('created_at', { ascending: true })

    if (data) {
      setComments(data)
    }
  }

  // 좋아요 상태 확인
  const checkLikeStatus = async () => {
    const { data } = await supabase
      .from('likes')
      .select('id')
      .eq('post_id', id)
      .eq('user_id', user.id)
      .maybeSingle()

    setIsLiked(!!data)
  }

  // 좋아요 토글
  const toggleLike = async () => {
    if (isLiked) {
      // 좋아요 취소
      await supabase
        .from('likes')
        .delete()
        .eq('post_id', id)
        .eq('user_id', user.id)
      setLikeCount(prev => prev - 1)
    } else {
      // 좋아요
      await supabase
        .from('likes')
        .insert([{ post_id: id, user_id: user.id }])
      setLikeCount(prev => prev + 1)
    }
    setIsLiked(!isLiked)
  }

  // 댓글 등록
  const handleCommentSubmit = async (e) => {
    e.preventDefault()
    if (!newComment.trim()) return

    const { error } = await supabase
      .from('comments')
      .insert([{
        post_id: id,
        author_id: user.id,
        content: newComment
      }])

    if (!error) {
      setNewComment('')
      fetchComments()
    }
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

  // 게시물 삭제
  const handleDelete = async () => {
    if (!window.confirm('정말 이 게시물을 삭제하시겠습니까?')) {
      return
    }

    const { error } = await supabase
      .from('posts')
      .delete()
      .eq('id', id)
      .eq('author_id', user.id)

    if (error) {
      alert('삭제에 실패했습니다.')
      return
    }

    alert('게시물이 삭제되었습니다.')
    navigate('/board')
  }

  // 본인 게시물인지 확인
  const isAuthor = user && post && post.author_id === user.id

  if (!post) {
    return <div className="loading">로딩중...</div>
  }

  return (
    <div className="detail-container">
      <div className="detail-box">
        <div className="detail-header">
          <h1>{post.title}</h1>
          <div className="detail-meta">
            <span className="author">{post.users?.nickname || '익명'}</span>
            <span className="date">{formatDate(post.created_at)}</span>
            <span className="views">조회 {post.view_count}</span>
          </div>
        </div>

        <div className="detail-price">
          <strong>판매가격:</strong> {formatPrice(post.price)}
        </div>

        <div className="detail-content">
          {post.content}
        </div>

        {post.hashtags && post.hashtags.length > 0 && (
          <div className="detail-hashtags">
            {post.hashtags.map((tag, index) => (
              <span key={index} className="hashtag">#{tag}</span>
            ))}
          </div>
        )}

        <div className="detail-actions">
          <div className="action-left">
            <button
              onClick={toggleLike}
              className={`btn-like ${isLiked ? 'liked' : ''}`}
            >
              {isLiked ? '❤️' : '🤍'} 좋아요 {likeCount}
            </button>
            {isAuthor && (
              <button onClick={handleDelete} className="btn-delete">
                🗑️ 삭제
              </button>
            )}
          </div>
          <button onClick={() => navigate('/board')} className="btn-back">
            ← 목록으로
          </button>
        </div>

        <div className="comments-section">
          <h3>댓글 ({comments.length})</h3>

          <div className="comments-list">
            {comments.map((comment) => (
              <div key={comment.id} className="comment-item">
                <div className="comment-header">
                  <span className="comment-author">{comment.users?.nickname || '익명'}</span>
                  <span className="comment-date">{formatDate(comment.created_at)}</span>
                </div>
                <p className="comment-content">{comment.content}</p>
              </div>
            ))}
          </div>

          <form onSubmit={handleCommentSubmit} className="comment-form">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="댓글을 입력하세요"
              rows={3}
            />
            <button type="submit" className="btn-comment">
              댓글 등록
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default PostDetail
