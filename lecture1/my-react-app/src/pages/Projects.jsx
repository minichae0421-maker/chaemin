import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Grid,
  CircularProgress,
  Alert,
} from '@mui/material';
import { supabase } from '../lib/supabase';
import ProjectCard from '../components/ProjectCard';

function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase
        .from('projects')
        .select('*')
        .eq('is_published', true)
        .order('sort_order', { ascending: true });

      if (fetchError) throw fetchError;

      setProjects(data || []);
    } catch (err) {
      console.error('프로젝트 데이터 로딩 실패:', err);
      setError('프로젝트 목록을 불러오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ backgroundColor: '#F8F8F6', minHeight: '100vh', width: '100%' }}>
      {/* 페이지 헤더 */}
      <Box
        sx={{
          backgroundColor: '#FFF200',
          py: 6,
          width: '100%',
        }}
      >
        <Box sx={{ px: 4 }}>
          <Typography
            variant="h1"
            sx={{
              color: '#1A1A5E',
              textAlign: 'center',
            }}
          >
            Projects
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: '#1A1A5E',
              textAlign: 'center',
              mt: 2,
              fontSize: '1.1rem',
            }}
          >
            제가 만든 프로젝트들을 소개합니다
          </Typography>
        </Box>
      </Box>

      {/* 프로젝트 목록 */}
      <Box sx={{ py: 8, px: 4, width: '100%' }}>
        {loading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
            <CircularProgress sx={{ color: '#1A1A5E' }} />
          </Box>
        )}

        {error && (
          <Alert severity="error" sx={{ mb: 4 }}>
            {error}
          </Alert>
        )}

        {!loading && !error && projects.length === 0 && (
          <Alert severity="info">
            아직 등록된 프로젝트가 없습니다.
          </Alert>
        )}

        {!loading && !error && projects.length > 0 && (
          <Grid
            container
            spacing={4}
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(2, 1fr)',
                md: 'repeat(3, 1fr)',
                lg: 'repeat(4, 1fr)',
              },
            }}
          >
            {projects.map((project) => (
              <Grid item key={project.id}>
                <ProjectCard project={project} />
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </Box>
  );
}

export default Projects;
