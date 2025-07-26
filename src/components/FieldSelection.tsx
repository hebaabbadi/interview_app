import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box,
  Button,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Container,
  Grid,
  useTheme,
  useMediaQuery,
  CssBaseline,
  AppBar,
  Toolbar,
  Avatar,
  Badge, GridProps
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { FieldOption } from '../types';

const FIELDS: FieldOption[] = [
  { value: 'AI', label: 'Artificial Intelligence' },
  { value: 'BI', label: 'Business Intelligence' },
  { value: 'WEB', label: 'Web Development' },
  { value: 'CYBER', label: 'Cybersecurity' }
];

const accentColor = '#fb8e40';

interface Props {
  onSelect: (fields: FieldOption[]) => void;
}

const FieldSelection: React.FC<Props> = ({ onSelect }) => {
  const [selected, setSelected] = useState<string[]>([]);
  const [userName, setUserName] = useState<string>('User');

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();

  const handleStartQuiz = () => {
    onSelect(FIELDS.filter(f => selected.includes(f.value)));
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    navigate('/login');
  };

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return;

        const res = await axios.get("http://localhost:5000/api/user/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUserName(res.data.name);
      } catch (error) {
        console.error("Failed to fetch user profile:", error);
      }
    };

    fetchUserProfile();
  }, []);

  return (
    <>
      <CssBaseline />
      <Box
        sx={{
          background: 'linear-gradient(135deg, #0f0f23 0%, #1a1a2e 30%, #2c1e4a 100%)',
          color: '#fff',
          fontFamily: '"Inter", "Roboto", sans-serif',
          minHeight: '100vh',
          height: '100%',
          width: '100%',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          margin: 0,
          padding: 0,
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `
              radial-gradient(circle at 20% 80%, rgba(251, 142, 64, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, rgba(251, 142, 64, 0.05) 0%, transparent 50%),
              radial-gradient(circle at 40% 40%, rgba(44, 30, 74, 0.3) 0%, transparent 50%)
            `,
            pointerEvents: 'none',
          },
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23fb8e40' fill-opacity='0.02'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            pointerEvents: 'none',
          }}
        />

        <Box sx={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', height: '100%' }}>
          <AppBar position="static" elevation={0} sx={{ bgcolor: 'rgba(255, 255, 255, 0.05)', backdropFilter: 'blur(10px)' }}>
            <Toolbar sx={{ justifyContent: 'space-between', py: 2, px: { xs: 2, md: 4 } }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Box
                  sx={{
                    fontSize: '2.5rem',
                    filter: 'drop-shadow(0 4px 8px rgba(251, 142, 64, 0.3))',
                    animation: 'float 3s ease-in-out infinite',
                    '@keyframes float': {
                      '0%, 100%': { transform: 'translateY(0px)' },
                      '50%': { transform: 'translateY(-5px)' },
                    },
                  }}
                >
                  🎓
                </Box>
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 800,
                    background: `linear-gradient(135deg, ${accentColor} 0%, #ff6b35 100%)`,
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    textShadow: '0 2px 4px rgba(251, 142, 64, 0.3)',
                    letterSpacing: '1px',
                  }}
                >
                  ORIENTATION
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                <Badge
                  overlap="circular"
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                  badgeContent={
                    <Box
                      sx={{
                        width: 16,
                        height: 16,
                        borderRadius: '50%',
                        bgcolor: '#4caf50',
                        border: '2px solid #fff',
                        animation: 'pulse 2s infinite',
                        '@keyframes pulse': {
                          '0%': { transform: 'scale(1)' },
                          '50%': { transform: 'scale(1.1)' },
                          '100%': { transform: 'scale(1)' },
                        },
                      }}
                    />
                  }
                >
                  <Avatar sx={{
                    bgcolor: accentColor,
                    width: 50,
                    height: 50,
                    fontSize: '1.5rem',
                    border: '3px solid rgba(255,255,255,0.2)',
                    boxShadow: '0 8px 25px rgba(251, 142, 64, 0.3)',
                    '&:hover': {
                      transform: 'scale(1.1)',
                      boxShadow: '0 12px 35px rgba(251, 142, 64, 0.4)',
                    }
                  }}>
                    {userName[0]?.toUpperCase()}
                  </Avatar>
                </Badge>
                {!isMobile && (
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 700, color: '#fff' }}>
                      Welcome back!
                    </Typography>
                    <Typography variant="body2" sx={{ color: accentColor, fontWeight: 600 }}>
                      {userName}
                    </Typography>
                  </Box>
                )}
                <Button
                  variant="outlined"
                  onClick={handleLogout}
                  sx={{
                    color: '#fff',
                    borderColor: 'rgba(255,255,255,0.3)',
                    '&:hover': {
                      borderColor: accentColor,
                      bgcolor: 'rgba(251, 142, 64, 0.1)',
                    },
                  }}
                >
                  Logout
                </Button>
              </Box>
            </Toolbar>
          </AppBar>

          <Container maxWidth="lg" sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Box sx={{ width: '100%' }}>
              <Typography
                variant={isMobile ? "h4" : "h3"}
                align="center"
                gutterBottom
                sx={{
                  fontWeight: 800,
                  background: `linear-gradient(135deg, #fff 0%, ${accentColor} 100%)`,
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  mb: 4
                }}
              >
                Choose Your Areas of Interest
              </Typography>
              <Grid container justifyContent="center">
               <Grid item xs={12}  component="div" {...({ item: true } as GridProps)}>
                  <FormControl fullWidth>
                    <InputLabel sx={{ color: 'rgba(255,255,255,0.7)', '&.Mui-focused': { color: accentColor } }}>
                      Select Fields
                    </InputLabel>
                    <Select
                      multiple
                      value={selected}
                      onChange={(e) => setSelected(e.target.value as string[])}
                      sx={{
                          color: '#fff',
                        '& .MuiOutlinedInput-notchedOutline': {
                          borderColor: 'rgba(255,255,255,0.3)',
                        },
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                          borderColor: 'rgba(255,255,255,0.5)',
                        },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                          borderColor: accentColor,
                        },
                        '& .MuiSvgIcon-root': {
                          color: 'rgba(255,255,255,0.7)',
                        },
                      }}
                      renderValue={(vals) => (
                        <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                          {vals.map(val => (
                            <Chip key={val} label={FIELDS.find(f => f.value === val)?.label} sx={{ bgcolor: accentColor, color: '#fff' }} />
                          ))}
                        </Box>
                      )}
                    >
                      {FIELDS.map(f => (
                        <MenuItem key={f.value} value={f.value}>
                          {f.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
              <Box sx={{ textAlign: 'center', mt: 6 }}>
                <Button
                  variant="contained"
                  disabled={selected.length === 0}
                  onClick={handleStartQuiz}
                  sx={{
                    bgcolor: accentColor,
                    color: '#fff',
                    fontWeight: 700,
                    padding: '18px 50px',
                    borderRadius: '30px',
                    fontSize: '1.2rem',
                    minWidth: 200,
                    boxShadow: '0 15px 40px rgba(251, 142, 64, 0.4)',
                    '&:hover': {
                      bgcolor: '#e67c36',
                      transform: 'translateY(-5px)',
                      boxShadow: '0 20px 50px rgba(251, 142, 64, 0.5)',
                    },
                    '&:disabled': {
                      bgcolor: 'rgba(255,255,255,0.2)',
                      color: 'rgba(255,255,255,0.5)',
                      boxShadow: 'none',
                    },
                  }}
                >
                  Start Quiz Now! 🚀
                </Button>
              </Box>
            </Box>
          </Container>
        </Box>
      </Box>
    </>
  );
};

export default FieldSelection;
