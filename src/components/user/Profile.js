import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  Grid,
  Container,
  AppBar,
  Toolbar,
  CssBaseline,
  Avatar,
  LinearProgress,
  Chip,
  IconButton,
  Badge,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

// You might not need these specific images for a profile page,
// but keeping them imported based on previous code
import chapeau from '../../assets/chapeau.jpg';
import fille from '../../assets/fille.jpg';

const accentColor = '#fb8e40';
const darkBackground = 'linear-gradient(135deg, #1a1a2e 0%, #2c1e4a 100%)';

export default function ProfilePage() {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const [userName, setUserName] = useState('User');
  const [quizStarted, setQuizStarted] = useState(false);
  const [userStats, setUserStats] = useState({
    quizzesCompleted: 3,
    totalQuizzes: 8,
    streak: 5,
    level: 'Intermediate'
  });

  // Simulate fetching user data on component mount
  useEffect(() => {
    const storedUserName = localStorage.getItem('userName') || 'Connected User';
    setUserName(storedUserName);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    navigate('/login');
  };

  const handleStartQuiz = () => {
    /* setQuizStarted(true); */
   navigate('/quiz');
  };

  const handleOrientationClick = () => {
    navigate('/profile');
  };

  const progressPercentage = (userStats.quizzesCompleted / userStats.totalQuizzes) * 100;

  return (
    <Box
      sx={{
        background: 'linear-gradient(135deg, #0f0f23 0%, #1a1a2e 30%, #2c1e4a 100%)',
        color: '#fff',
        fontFamily: '"Inter", "Roboto", sans-serif',
        minHeight: '100vh',
        position: 'relative',
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
      <CssBaseline />
      
      {/* Floating particles effect */}
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

      <Box sx={{ position: 'relative', zIndex: 1 }}>
        {/* Enhanced Header */}
        <AppBar 
          position="static" 
          elevation={0} 
          sx={{ 
            bgcolor: 'transparent', 
            mb: 4,
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(255, 255, 255, 0.08)',
              backdropFilter: 'blur(20px)',
              borderRadius: '0 0 20px 20px',
            }
          }}
        >
          <Toolbar 
            sx={{ 
              justifyContent: 'space-between',
              position: 'relative',
              zIndex: 1,
              py: 2,
              px: { xs: 2, md: 4 }
            }}
          >
            {/* Enhanced App Title */}
            <Box 
              sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: 2,
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-2px)',
                }
              }}
              onClick={handleOrientationClick}
            >
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

            {/* Enhanced User Info and Logout */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
              {/* User Avatar/Name with Badge */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
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
                  <Avatar 
                    sx={{ 
                      bgcolor: accentColor, 
                      width: 50, 
                      height: 50, 
                      fontSize: '1.5rem',
                      border: '3px solid rgba(255,255,255,0.2)',
                      boxShadow: '0 8px 25px rgba(251, 142, 64, 0.3)',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'scale(1.1)',
                        boxShadow: '0 12px 35px rgba(251, 142, 64, 0.4)',
                      }
                    }}
                  >
                    {userName ? userName[0].toUpperCase() : 'U'}
                  </Avatar>
                </Badge>
                
                {!isMobile && (
                  <Box>
                    <Typography 
                      variant="h6" 
                      sx={{ 
                        fontWeight: 700, 
                        color: '#fff',
                        lineHeight: 1.2,
                      }}
                    >
                      Welcome back!
                    </Typography>
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        color: accentColor,
                        fontWeight: 600,
                      }}
                    >
                      {userName}
                    </Typography>
                  </Box>
                )}
              </Box>

              {/* Enhanced Logout Button */}
              <Button
                variant="contained"
                onClick={handleLogout}
                sx={{
                  borderRadius: '15px',
                  bgcolor: 'rgba(255,255,255,0.1)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  color: '#fff',
                  fontWeight: 700,
                  padding: '10px 20px',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    bgcolor: 'rgba(255,255,255,0.2)',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 8px 25px rgba(0,0,0,0.2)',
                  },
                }}
              >
                Logout
              </Button>
            </Box>
          </Toolbar>
        </AppBar>

        {/* Main Profile Content */}
        <Container maxWidth="lg" sx={{ py: 4 }}>
          <Grid container spacing={4}>
           
           

            {/* Enhanced Quiz Section */}
            <Grid item xs={12} lg={8}>
              <Grid container spacing={3} sx={{ height: '100%' }}>

                {/* Main Quiz Card */}
                <Grid item xs={12}>
                  <Card
                    sx={{
                      background: 'rgba(255, 255, 255, 0.08)',
                      backdropFilter: 'blur(20px)',
                      borderRadius: '24px',
                      boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      p: 4,
                      textAlign: 'center',
                      minHeight: 400,
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      position: 'relative',
                      overflow: 'hidden',
                      animation: 'fadeInUp 0.6s ease-out 0.4s both',
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: `radial-gradient(circle at center, ${accentColor}10, transparent)`,
                        pointerEvents: 'none',
                      },
                    }}
                  >
                    <CardContent sx={{ p: 0, position: 'relative', zIndex: 1 }}>
                      {!quizStarted ? (
                        <Box
                          sx={{
                            animation: 'fadeIn 0.8s ease-out',
                            '@keyframes fadeIn': {
                              '0%': { opacity: 0 },
                              '100%': { opacity: 1 },
                            },
                          }}
                        >
                          {/* Quiz Icon */}
                          <Box
                            sx={{
                              fontSize: '4rem',
                              mb: 3,
                              filter: 'drop-shadow(0 8px 16px rgba(251, 142, 64, 0.3))',
                              animation: 'bounce 2s infinite',
                              '@keyframes bounce': {
                                '0%, 20%, 50%, 80%, 100%': { transform: 'translateY(0)' },
                                '40%': { transform: 'translateY(-10px)' },
                                '60%': { transform: 'translateY(-5px)' },
                              },
                            }}
                          >
                            🧠
                          </Box>
                          
                          <Typography 
                            variant="h3" 
                            gutterBottom 
                            sx={{ 
                              fontWeight: 800, 
                              color: '#fff',
                              mb: 2,
                              background: `linear-gradient(135deg, #fff 0%, ${accentColor} 100%)`,
                              backgroundClip: 'text',
                              WebkitBackgroundClip: 'text',
                              WebkitTextFillColor: 'transparent',
                            }}
                          >
                            Ready for the Next Quiz?
                          </Typography>
                          
                          <Typography 
                            variant="h6" 
                            sx={{ 
                              color: 'rgba(255,255,255,0.8)', 
                              mb: 4,
                              maxWidth: 500,
                              mx: 'auto',
                              lineHeight: 1.6,
                            }}
                          >
                            Test your knowledge and get personalized orientation recommendations tailored just for you.
                          </Typography>
                          
                          <Button
                            variant="contained"
                            size="large"
                            onClick={handleStartQuiz}
                            sx={{
                              bgcolor: accentColor,
                              color: '#fff',
                              fontWeight: 700,
                              padding: '18px 50px',
                              borderRadius: '30px',
                              fontSize: '1.2rem',
                              position: 'relative',
                              overflow: 'hidden',
                              boxShadow: '0 15px 40px rgba(251, 142, 64, 0.4)',
                              transition: 'all 0.4s ease',
                              '&:hover': {
                                bgcolor: '#e67c36',
                                transform: 'translateY(-5px)',
                                boxShadow: '0 20px 50px rgba(251, 142, 64, 0.5)',
                              },
                              '&::before': {
                                content: '""',
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                width: 0,
                                height: 0,
                                borderRadius: '50%',
                                background: 'rgba(255,255,255,0.2)',
                                transform: 'translate(-50%, -50%)',
                                transition: 'width 0.6s ease, height 0.6s ease',
                              },
                              '&:hover::before': {
                                width: '300px',
                                height: '300px',
                              },
                            }}
                          >
                            <Box component="span" sx={{ position: 'relative', zIndex: 1 }}>
                              Start Quiz Now! 🚀
                            </Box>
                          </Button>
                        </Box>
                      ) : (
                        <Box
                          sx={{
                            animation: 'slideInUp 0.6s ease-out',
                            '@keyframes slideInUp': {
                              '0%': { opacity: 0, transform: 'translateY(50px)' },
                              '100%': { opacity: 1, transform: 'translateY(0px)' },
                            },
                          }}
                        >
                          <Box
                            sx={{
                              fontSize: '3rem',
                              mb: 3,
                              animation: 'spin 2s linear infinite',
                              '@keyframes spin': {
                                '0%': { transform: 'rotate(0deg)' },
                                '100%': { transform: 'rotate(360deg)' },
                              },
                            }}
                          >
                            ⚡
                          </Box>
                          <Typography 
                            variant="h4" 
                            sx={{ 
                              fontWeight: 700, 
                              color: accentColor, 
                              mb: 2 
                            }}
                          >
                            Quiz Started!
                          </Typography>
                          <Typography 
                            variant="body1" 
                            sx={{ 
                              color: 'rgba(255,255,255,0.8)',
                              mb: 4,
                            }}
                          >
                            Loading your personalized questions...
                          </Typography>
                          <LinearProgress
                            sx={{
                              width: '60%',
                              mx: 'auto',
                              height: 6,
                              borderRadius: 3,
                              backgroundColor: 'rgba(255,255,255,0.1)',
                              '& .MuiLinearProgress-bar': {
                                backgroundColor: accentColor,
                                borderRadius: 3,
                              },
                            }}
                          />
                        </Box>
                      )}
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Container>

        {/* Enhanced Footer */}
        <Box 
          sx={{ 
            mt: 8, 
            py: 4, 
            textAlign: 'center',
            borderTop: '1px solid rgba(255,255,255,0.1)',
            position: 'relative',
          }}
        >
          <Typography 
            variant="body2" 
            sx={{ 
              color: 'rgba(255,255,255,0.6)',
              fontSize: '1rem',
            }}
          >
            © 2025 Orientation. All rights reserved.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}