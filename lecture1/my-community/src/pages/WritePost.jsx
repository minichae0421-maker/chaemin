import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'

function WritePost() {
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [price, setPrice] = useState('')
  const [hashtagInput, setHashtagInput] = useState('')
  const [hashtags, setHashtags] = useState([])
  const [user, setUser] = useState(null)

  useEffect(() => {
    // 로그인 확인
    const userData = localStorage.getItem('user')
    if (!userData) {
      navigate('/')
      return
    }
    setUser(JSON.parse(userData))
  }, [navigate])

  // 해시태그 추가
  const addHashtag = () => {
    const tag = hashtagInput.trim().replace(/^#/, '')
    if (tag && !hashtags.includes(tag)) {
      setHashtags([...hashtags, tag])
      setHashtagInput('')
    }
  }

  // 엔터키로 해시태그 추가
  const handleHashtagKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      addHashtag()
    }
  }

  // 해시태그 삭제
  const removeHashtag = (tagToRemove) => {
    setHashtags(hashtags.filter(tag => tag !== tagToRemove))
  }

  // 게시물 등록
  const handleSubmit = async (e) => {
    e.preventDefault()

    const { error } = await supabase
      .from('posts')
      .insert([{
        title,
        content,
        price: parseInt(price) || 0,
        author_id: user.id,
        hashtags: hashtags.length > 0 ? hashtags : null
      }])

    if (error) {
      alert('게시물 등록에 실패했습니다.')
      return
    }

    alert('게시물이 등록되었습니다!')
    navigate('/board')
  }

  return (
    <div className="write-container">
      <div className="write-box">
        <h2>게시물 작성</h2>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>제목</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="제목을 입력하세요"
              required
            />
          </div>

          <div className="input-group">
            <label>내용</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="내용을 입력하세요"
              rows={8}
              required
            />
          </div>

          <div className="input-group">
            <label>상품 가격 (원)</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="가격을 입력하세요"
              min="0"
            />
          </div>

          <div className="input-group">
            <label>해시태그</label>
            <div className="hashtag-input-wrapper">
              <input
                type="text"
                value={hashtagInput}
                onChange={(e) => setHashtagInput(e.target.value)}
                onKeyDown={handleHashtagKeyDown}
                placeholder="#해시태그 입력 후 Enter"
              />
              <button type="button" onClick={addHashtag} className="btn-add-tag">
                추가
              </button>
            </div>
            {hashtags.length > 0 && (
              <div className="hashtag-list">
                {hashtags.map((tag, index) => (
                  <span key={index} className="hashtag-item">
                    #{tag}
                    <button type="button" onClick={() => removeHashtag(tag)} className="btn-remove-tag">
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="button-group">
            <button type="button" onClick={() => navigate('/board')} className="btn-cancel">
              취소
            </button>
            <button type="submit" className="btn-primary">
              게시물 등록
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default WritePost
