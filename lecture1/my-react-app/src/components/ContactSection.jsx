import { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  IconButton,
  Grid,
  Chip,
  Divider,
  FormControlLabel,
  Checkbox,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  CircularProgress,
  Alert,
  Snackbar,
} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import SendIcon from '@mui/icons-material/Send';
import PersonIcon from '@mui/icons-material/Person';
import BusinessIcon from '@mui/icons-material/Business';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { supabase } from '../lib/supabase';

// 긍정적 이모지 목록
const EMOJIS = ['😊', '🎉', '💪', '🌟', '❤️', '👍', '🙌', '✨', '🔥', '💯'];

// 지역 목록
const REGIONS = [
  '서울', '부산', '대구', '인천', '광주', '대전', '울산', '세종',
  '경기', '강원', '충북', '충남', '전북', '전남', '경북', '경남', '제주', '해외'
];

function ContactSection() {
  // 방명록 목록 상태
  const [guestbookEntries, setGuestbookEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // 폼 상태
  const [formData, setFormData] = useState({
    name: '',
    message: '',
    email: '',
    emoji: '😊',
    affiliation: '',
    region: '',
    showEmail: false,
  });

  // 알림 상태
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  // 방명록 목록 불러오기
  const fetchGuestbook = async () => {
    try {
      const { data, error } = await supabase
        .from('guestbook')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setGuestbookEntries(data || []);
    } catch (error) {
      console.error('방명록 로딩 오류:', error);
      setSnackbar({ open: true, message: '방명록을 불러오는데 실패했습니다.', severity: 'error' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGuestbook();
  }, []);

  // 폼 입력 처리
  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  // 이모지 선택
  const handleEmojiSelect = (emoji) => {
    setFormData(prev => ({ ...prev, emoji }));
  };

  // 방명록 작성
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.message.trim()) {
      setSnackbar({ open: true, message: '메시지를 입력해주세요.', severity: 'warning' });
      return;
    }

    setSubmitting(true);

    try {
      const { error } = await supabase.from('guestbook').insert({
        name: formData.name.trim() || null,
        message: formData.message.trim(),
        email: formData.email.trim() || null,
        emoji: formData.emoji,
        affiliation: formData.affiliation.trim() || null,
        region: formData.region || null,
        show_email: formData.showEmail,
      });

      if (error) throw error;

      setSnackbar({ open: true, message: '방명록이 등록되었습니다!', severity: 'success' });
      setFormData({
        name: '',
        message: '',
        email: '',
        emoji: '😊',
        affiliation: '',
        region: '',
        showEmail: false,
      });
      fetchGuestbook();
    } catch (error) {
      console.error('방명록 작성 오류:', error);
      setSnackbar({ open: true, message: '방명록 등록에 실패했습니다.', severity: 'error' });
    } finally {
      setSubmitting(false);
    }
  };

  // 날짜 포맷팅
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <Box sx={{ backgroundColor: '#1A1A5E', py: 6 }}>
      <Container maxWidth="md">
        {/* 연락처 카드 */}
        <Card sx={{ backgroundColor: '#FFF200', mb: 4 }}>
          <CardContent sx={{ py: 5, textAlign: 'center' }}>
            <Typography
              variant="h2"
              sx={{ color: '#1A1A5E', mb: 3 }}
            >
              Contact
            </Typography>

            {/* 이메일 정보 */}
            <Card
              sx={{
                maxWidth: 400,
                mx: 'auto',
                mb: 3,
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
              }}
            >
              <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1.5 }}>
                <EmailIcon sx={{ color: '#1A1A5E', fontSize: 28 }} />
                <Typography
                  variant="body1"
                  sx={{
                    color: '#1A1A5E',
                    fontWeight: 600,
                    fontSize: '1.1rem',
                  }}
                >
                  minichae0421@gmail.com
                </Typography>
              </CardContent>
            </Card>

            {/* SNS 링크 */}
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
              <IconButton
                href="https://github.com/minichae0421-maker"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  backgroundColor: '#1A1A5E',
                  color: '#FFFFFF',
                  width: 50,
                  height: 50,
                  '&:hover': {
                    backgroundColor: '#0D0D4D',
                    transform: 'scale(1.1)',
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                <GitHubIcon />
              </IconButton>
              <IconButton
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  backgroundColor: '#1A1A5E',
                  color: '#FFFFFF',
                  width: 50,
                  height: 50,
                  '&:hover': {
                    backgroundColor: '#0D0D4D',
                    transform: 'scale(1.1)',
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                <LinkedInIcon />
              </IconButton>
            </Box>
          </CardContent>
        </Card>

        {/* 방명록 섹션 */}
        <Card sx={{ backgroundColor: '#FFFFFF' }}>
          <CardContent sx={{ py: 5 }}>
            <Typography
              variant="h3"
              sx={{ color: '#1A1A5E', textAlign: 'center', mb: 4 }}
            >
              방명록
            </Typography>

            {/* 방명록 작성 폼 */}
            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{
                mb: 4,
                p: 3,
                backgroundColor: '#F8F8F6',
                borderRadius: 2,
              }}
            >
              <Grid container spacing={2}>
                {/* 이름 */}
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    fullWidth
                    label="이름"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="비워두면 익명으로 표시됩니다"
                    size="small"
                    slotProps={{
                      input: {
                        startAdornment: <PersonIcon sx={{ mr: 1, color: '#1A1A5E' }} />,
                      },
                    }}
                  />
                </Grid>

                {/* 소속 */}
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    fullWidth
                    label="소속/직업"
                    name="affiliation"
                    value={formData.affiliation}
                    onChange={handleChange}
                    placeholder="회사, 학교 등 (선택)"
                    size="small"
                    slotProps={{
                      input: {
                        startAdornment: <BusinessIcon sx={{ mr: 1, color: '#1A1A5E' }} />,
                      },
                    }}
                  />
                </Grid>

                {/* 지역 */}
                <Grid size={{ xs: 12, sm: 6 }}>
                  <FormControl fullWidth size="small">
                    <InputLabel>거주 지역</InputLabel>
                    <Select
                      name="region"
                      value={formData.region}
                      onChange={handleChange}
                      label="거주 지역"
                      startAdornment={<LocationOnIcon sx={{ mr: 1, color: '#1A1A5E' }} />}
                    >
                      <MenuItem value="">선택 안함</MenuItem>
                      {REGIONS.map((region) => (
                        <MenuItem key={region} value={region}>{region}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                {/* 이메일 */}
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    fullWidth
                    label="이메일"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="선택사항"
                    size="small"
                    slotProps={{
                      input: {
                        startAdornment: <EmailIcon sx={{ mr: 1, color: '#1A1A5E' }} />,
                      },
                    }}
                  />
                </Grid>

                {/* 이메일 공개 체크박스 */}
                {formData.email && (
                  <Grid size={12}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          name="showEmail"
                          checked={formData.showEmail}
                          onChange={handleChange}
                          sx={{ color: '#1A1A5E' }}
                        />
                      }
                      label="이메일을 공개합니다"
                    />
                  </Grid>
                )}

                {/* 이모지 선택 */}
                <Grid size={12}>
                  <Typography variant="body2" sx={{ mb: 1, color: '#1A1A5E' }}>
                    이모지 선택
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                    {EMOJIS.map((emoji) => (
                      <Chip
                        key={emoji}
                        label={emoji}
                        onClick={() => handleEmojiSelect(emoji)}
                        sx={{
                          fontSize: '1.3rem',
                          cursor: 'pointer',
                          backgroundColor: formData.emoji === emoji ? '#FFF200' : '#FFFFFF',
                          border: formData.emoji === emoji ? '2px solid #1A1A5E' : '1px solid #ddd',
                          '&:hover': {
                            backgroundColor: '#FFF200',
                          },
                        }}
                      />
                    ))}
                  </Box>
                </Grid>

                {/* 메시지 */}
                <Grid size={12}>
                  <TextField
                    fullWidth
                    label="메시지"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    multiline
                    rows={3}
                    required
                    placeholder="방명록 내용을 작성해주세요"
                  />
                </Grid>

                {/* 제출 버튼 */}
                <Grid size={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    disabled={submitting}
                    endIcon={submitting ? <CircularProgress size={20} /> : <SendIcon />}
                    sx={{
                      backgroundColor: '#1A1A5E',
                      py: 1.5,
                      '&:hover': {
                        backgroundColor: '#0D0D4D',
                      },
                    }}
                  >
                    {submitting ? '등록 중...' : '방명록 남기기'}
                  </Button>
                </Grid>
              </Grid>
            </Box>

            <Divider sx={{ my: 4 }} />

            {/* 방명록 목록 */}
            <Typography variant="h4" sx={{ color: '#1A1A5E', mb: 3 }}>
              남겨진 메시지들
            </Typography>

            {loading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
                <CircularProgress />
              </Box>
            ) : guestbookEntries.length === 0 ? (
              <Box sx={{ textAlign: 'center', py: 4 }}>
                <Typography color="text.secondary">
                  아직 작성된 방명록이 없습니다. 첫 번째로 메시지를 남겨주세요!
                </Typography>
              </Box>
            ) : (
              <Grid container spacing={2}>
                {guestbookEntries.map((entry) => (
                  <Grid size={{ xs: 12, sm: 6 }} key={entry.id}>
                    <Card
                      sx={{
                        height: '100%',
                        backgroundColor: '#F8F8F6',
                        border: '1px solid #E0E0E0',
                      }}
                    >
                      <CardContent>
                        {/* 이모지와 이름 */}
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                          <Typography sx={{ fontSize: '1.5rem' }}>
                            {entry.emoji}
                          </Typography>
                          <Typography
                            variant="subtitle1"
                            sx={{ fontWeight: 600, color: '#1A1A5E' }}
                          >
                            {entry.name || '익명'}
                          </Typography>
                        </Box>

                        {/* 소속 정보 */}
                        {entry.affiliation && (
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ mb: 1, display: 'flex', alignItems: 'center', gap: 0.5 }}
                          >
                            <BusinessIcon sx={{ fontSize: 16 }} />
                            {entry.affiliation}
                            {entry.region && ` | ${entry.region}`}
                          </Typography>
                        )}

                        {/* 메시지 */}
                        <Typography
                          variant="body1"
                          sx={{
                            my: 1.5,
                            color: '#2D2D5E',
                            whiteSpace: 'pre-wrap',
                          }}
                        >
                          {entry.message}
                        </Typography>

                        {/* 이메일 (공개 시) */}
                        {entry.show_email && entry.email && (
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}
                          >
                            <EmailIcon sx={{ fontSize: 16 }} />
                            {entry.email}
                          </Typography>
                        )}

                        {/* 날짜 */}
                        <Typography
                          variant="caption"
                          color="text.secondary"
                          sx={{ mt: 1, display: 'block' }}
                        >
                          {formatDate(entry.created_at)}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            )}
          </CardContent>
        </Card>
      </Container>

      {/* 알림 스낵바 */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default ContactSection;
