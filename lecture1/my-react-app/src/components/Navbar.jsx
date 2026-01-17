import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Box,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';

// 네비게이션 메뉴 항목 (3개 탭)
const menuItems = [
  { label: 'Home', path: '/' },
  { label: 'About Me', path: '/about' },
  { label: 'Projects', path: '/projects' },
];

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const location = useLocation();

  // 현재 경로와 일치하는지 확인
  const isActive = (path) => location.pathname === path;

  return (
    <>
      <AppBar
        position="sticky"
        sx={{
          backgroundColor: '#1A1A5E',
        }}
      >
        <Toolbar sx={{ maxWidth: 1200, width: '100%', mx: 'auto' }}>
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{
              flexGrow: 1,
              fontWeight: 700,
              textDecoration: 'none',
              color: '#FFF200',
            }}
          >
            My Portfolio
          </Typography>

          {/* 데스크톱 메뉴 */}
          {!isMobile && (
            <Box sx={{ display: 'flex', gap: 1 }}>
              {menuItems.map((item) => (
                <Button
                  key={item.path}
                  component={Link}
                  to={item.path}
                  sx={{
                    color: isActive(item.path) ? '#FFF200' : '#FFFFFF',
                    borderBottom: isActive(item.path) ? '2px solid #FFF200' : 'none',
                    borderRadius: 0,
                    px: 2,
                    '&:hover': {
                      backgroundColor: 'rgba(255, 242, 0, 0.1)',
                      color: '#FFF200',
                    },
                  }}
                >
                  {item.label}
                </Button>
              ))}
            </Box>
          )}

          {/* 모바일 햄버거 버튼 */}
          {isMobile && (
            <IconButton
              sx={{ color: '#FFF200' }}
              onClick={() => setMobileOpen(true)}
            >
              <MenuIcon />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>

      {/* 모바일 메뉴 Drawer */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
      >
        <Box sx={{ width: 250, pt: 2, backgroundColor: '#F8F8F6', height: '100%' }}>
          <List>
            {menuItems.map((item) => (
              <ListItem key={item.path} disablePadding>
                <ListItemButton
                  component={Link}
                  to={item.path}
                  onClick={() => setMobileOpen(false)}
                  selected={isActive(item.path)}
                  sx={{
                    '&.Mui-selected': {
                      backgroundColor: 'rgba(255, 242, 0, 0.3)',
                      borderLeft: '4px solid #FFF200',
                    },
                    '&:hover': {
                      backgroundColor: 'rgba(26, 26, 94, 0.1)',
                    },
                  }}
                >
                  <ListItemText
                    primary={item.label}
                    sx={{
                      '& .MuiTypography-root': {
                        color: '#1A1A5E',
                        fontWeight: isActive(item.path) ? 700 : 400,
                      }
                    }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
}

export default Navbar;
