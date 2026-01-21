import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
  CardActionArea,
} from '@mui/material';
import LaunchIcon from '@mui/icons-material/Launch';
import TechStackIcons from './TechStackIcons';

function ProjectCard({ project }) {
  const { title, description, tech_stack, detail_url, thumbnail_url } = project;

  const handleViewDetails = (e) => {
    e.stopPropagation();
    window.open(detail_url, '_blank', 'noopener,noreferrer');
  };

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'all 0.3s ease-in-out',
        '&:hover': {
          transform: 'translateY(-8px)',
          boxShadow: '0 12px 40px rgba(26, 26, 94, 0.2)',
        },
      }}
    >
      <CardActionArea onClick={handleViewDetails}>
        <CardMedia
          component="img"
          height="240"
          image={thumbnail_url}
          alt={title}
          sx={{
            objectFit: 'cover',
            backgroundColor: '#F8F8F6',
          }}
          onError={(e) => {
            e.target.style.display = 'none';
            e.target.parentElement.style.height = '200px';
            e.target.parentElement.style.backgroundColor = '#1A1A5E';
            e.target.parentElement.style.display = 'flex';
            e.target.parentElement.style.alignItems = 'center';
            e.target.parentElement.style.justifyContent = 'center';
            const fallbackText = document.createElement('div');
            fallbackText.textContent = title;
            fallbackText.style.color = '#FFF200';
            fallbackText.style.fontSize = '24px';
            fallbackText.style.fontWeight = '700';
            fallbackText.style.textAlign = 'center';
            fallbackText.style.padding = '20px';
            e.target.parentElement.appendChild(fallbackText);
          }}
        />
        <CardContent sx={{ flexGrow: 1, p: 3 }}>
          <Typography
            gutterBottom
            variant="h5"
            component="h2"
            sx={{
              color: '#1A1A5E',
              fontWeight: 700,
              mb: 2,
            }}
          >
            {title}
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              mb: 3,
              lineHeight: 1.6,
              minHeight: '60px',
            }}
          >
            {description}
          </Typography>

          <Box sx={{ mb: 3 }}>
            <TechStackIcons techStack={tech_stack} />
          </Box>

          <Button
            fullWidth
            variant="contained"
            endIcon={<LaunchIcon />}
            onClick={handleViewDetails}
            sx={{
              backgroundColor: '#1A1A5E',
              color: '#FFF200',
              fontWeight: 600,
              py: 1.5,
              '&:hover': {
                backgroundColor: '#0D0D4D',
                transform: 'scale(1.02)',
              },
              transition: 'all 0.2s ease-in-out',
            }}
          >
            View Details
          </Button>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default ProjectCard;
