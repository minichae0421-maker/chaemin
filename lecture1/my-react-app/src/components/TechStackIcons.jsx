import { Box, Chip } from '@mui/material';
import CodeIcon from '@mui/icons-material/Code';
import StorageIcon from '@mui/icons-material/Storage';
import CloudIcon from '@mui/icons-material/Cloud';
import StyleIcon from '@mui/icons-material/Style';
import ApiIcon from '@mui/icons-material/Api';

const getTechIcon = (tech) => {
  const techLower = tech.toLowerCase();

  if (techLower.includes('react')) return <CodeIcon />;
  if (techLower.includes('supabase')) return <CloudIcon />;
  if (techLower.includes('postgresql') || techLower.includes('postgres')) return <StorageIcon />;
  if (techLower.includes('css')) return <StyleIcon />;
  if (techLower.includes('mui')) return <StyleIcon />;
  if (techLower.includes('api')) return <ApiIcon />;

  return <CodeIcon />;
};

const getTechColor = (tech) => {
  const techLower = tech.toLowerCase();

  if (techLower.includes('react')) return '#61DAFB';
  if (techLower.includes('supabase')) return '#3ECF8E';
  if (techLower.includes('postgresql') || techLower.includes('postgres')) return '#336791';
  if (techLower.includes('css')) return '#1572B6';
  if (techLower.includes('mui')) return '#007FFF';
  if (techLower.includes('api')) return '#FF6C37';

  return '#1A1A5E';
};

function TechStackIcons({ techStack }) {
  if (!techStack || techStack.length === 0) {
    return null;
  }

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
      {techStack.map((tech, index) => (
        <Chip
          key={index}
          icon={getTechIcon(tech)}
          label={tech}
          size="small"
          sx={{
            backgroundColor: 'rgba(26, 26, 94, 0.08)',
            color: getTechColor(tech),
            fontWeight: 600,
            '& .MuiChip-icon': {
              color: getTechColor(tech),
            },
            '&:hover': {
              backgroundColor: 'rgba(26, 26, 94, 0.15)',
            },
          }}
        />
      ))}
    </Box>
  );
}

export default TechStackIcons;
