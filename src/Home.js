import React from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  Grid,
  Container,
  CssBaseline,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

import chapeau from './assets/chapeau.jpg';
import fille from './assets/fille.jpg';
import data from './assets/data.jpg';
import ia from './assets/ia.png';
import cyber from './assets/cyber.png';
import dev from './assets/dev.png';

const purplePrimary = '#fb8e40';

export default function Landing() {
  const navigate = useNavigate();

  const steps = [
    {
      number: '01',
      title: 'Log in or Sign up',
      subtitle: 'Create your account and join our community of learners',
      color: '#4dabf7',
      action: 'Get started',
      icon: '🔢',
      route: '/login'
    },
    //👥
    {
      number: '02', 
      title: 'Take the test',
      subtitle: 'Complete our personalized assessment to discover your path',
      color: '#20c997',
      action: 'Start',
      icon: '🧾',
      route: '/login'
    },
    {
      number: '03',
      title: 'See the results',
      subtitle: 'Get your personalized recommendations and career guidance',
      color: '#ffd43b',
      action: 'View',
      icon: '🏆',
      route: '/login'
    }
  ];

  const featuresData = [
    {
      title: 'Data science and BI',
      description: 'Data analysis and visualization to extract insights and support decision-making.',
      imageSrc: data,
      imageAlt: 'Data science illustration',
    },
    {
      title: 'Cybersecurity',
      description: 'Protecting systems and data from threats and unauthorized access.',
      imageSrc: cyber,
      imageAlt: 'Cybersecurity illustration',
    },
    {
      title: 'Machine learning and AI',
      description: 'Design and development of systems capable of learning and making autonomous decisions.',
      imageSrc: ia,
      imageAlt: 'Machine learning illustration',
    },
    {
      title: 'web Development',
      description: 'Creating interactive and responsive applications for the web and mobile devices.',
      imageSrc: dev,
      imageAlt: 'Web and mobile development illustration',
    },
  ];

  return (
    <>
    <CssBaseline />
    <Box
      sx={{
        background: `
          radial-gradient(circle at 20% 80%, rgba(251, 142, 64, 0.15) 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, rgba(44, 30, 74, 0.8) 0%, transparent 50%),
          radial-gradient(circle at 40% 40%, rgba(26, 26, 46, 0.9) 0%, transparent 50%),
          linear-gradient(135deg, #1a1a2e 0%, #2c1e4a 100%)
        `,
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `
            repeating-linear-gradient(
              45deg,
              transparent,
              transparent 2px,
              rgba(255, 255, 255, 0.01) 2px,
              rgba(255, 255, 255, 0.01) 4px
            )
          `,
          pointerEvents: 'none',
        },
        textAlign: 'center',
        padding: { xs: '20px', md: '40px' },
        color: '#fff',
        fontFamily: 'sans-serif',
        minHeight: '100vh',
        overflow: 'hidden',
        margin: 0,
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(8px)',
          padding: '16px 24px',
          borderRadius: '12px',
          mb: 8,
          boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
        }}
      >
        <Typography variant="h6" component="div" sx={{ fontWeight: 700, color: '#fb8e40', textShadow: '0 2px 4px rgba(251, 142, 64, 0.3)' }}>
         🎓 ORIENTATION 
        </Typography>
        <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1 }}>
          {['About us', 'Features', 'more'].map((item, index) => (
            <Button
              key={item}
              sx={{
                color: '#fff',
                fontWeight: 600,
                padding: '8px 20px',
                borderRadius: '12px',
                position: 'relative',
                overflow: 'hidden',
                transition: 'all 0.3s ease',
                '&:hover': {
                  color: purplePrimary,
                  backgroundColor: 'rgba(251, 142, 64, 0.1)',
                  transform: 'translateY(-2px)',
                },
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  bottom: 0,
                  left: '50%',
                  width: 0,
                  height: '2px',
                  backgroundColor: purplePrimary,
                  transform: 'translateX(-50%)',
                  transition: 'width 0.3s ease',
                },
                '&:hover::before': {
                  width: '80%',
                },
              }}
              onClick={() => {
                const targetId = item === 'About us' ? null : 
                               item === 'Features' ? 'features' : 'test';
                if (targetId) {
                  document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              {item}
            </Button>
          ))}
        </Box>
        <Button
          variant="contained"
          sx={{
            borderRadius: '20px',
            bgcolor: purplePrimary,
            '&:hover': {
              bgcolor: 'green',
            },
            fontWeight: 700,
          }}
          onClick={() => navigate('/login')}
        >
          Login
        </Button>
      </Box>

      {/* About Us Section (Hero style) */}
      <Container maxWidth="lg" sx={{ my: 10 }}>
        <Grid container spacing={6} alignItems="center">
          <Grid item xs={12} md={6} sx={{ textAlign: { xs: 'center', md: 'left' } }}>
            <Typography
              variant="h1"
              gutterBottom
              sx={{
                fontWeight: 800,
                letterSpacing: '1px',
                mb: 3,
                fontSize: { xs: '2.5rem', md: '4rem' },
                lineHeight: 1.1,
                maxWidth: '600px',
                mx: { xs: 'auto', md: 0 },
              }}
            >
             Education  <span style={{ color: purplePrimary }}>of Excellence.</span>
            </Typography>
            <Typography
              variant="h5"
              gutterBottom
              sx={{
                color: '#ccc',
                mb: 4,
                maxWidth: '550px',
                mx: { xs: 'auto', md: 0 },
                lineHeight: 1.6,
              }}
            >
             Are you a student or young person unsure about which career path to follow?
            </Typography>
            <Typography
              variant="body1"
              display="block"
              sx={{
                color: '#aaa',
                mb: 4,
                maxWidth: '550px',
                mx: { xs: 'auto', md: 0 },
              }}
            >
             If you're unsure about which field to pursue or torn between multiple paths, our guidance assistant is here to help you decide.
            </Typography>
            <Box sx={{ mt: 4, textAlign: { xs: 'center', md: 'left' } }}>
              <Button
                variant="outlined"
                size="large"
                sx={{
                  borderColor: '#fff',
                  color: '#fff',
                  fontWeight: 700,
                  borderRadius: '25px',
                  padding: '10px 30px',
                  '&:hover': {
                    borderColor: purplePrimary,
                    color: purplePrimary,
                    backgroundColor: 'rgba(251, 170, 64, 0.1)',
                  },
                }}
                onClick={() => document.getElementById('test')?.scrollIntoView({ behavior: 'smooth' })}
              >
               Take action
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                flex: 1,
                mt: { xs: 4, md: 0 },
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <Card
                sx={{
                  width: { xs: '100%', sm: 500 },
                  height: { xs: 300, sm: 400 },
                  background: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: '16px',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <img
                  src={fille}
                  alt="About Us"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </Card>
            </Box>
          </Grid>
        </Grid>
      </Container>

     

      {/* Features Section (Horizontal Scroll) */}
      <Container id="features" maxWidth="lg" sx={{ py: 8 }}>
        <Typography
          variant="h2"
          align="center"
          gutterBottom
          sx={{
            fontWeight: 700,
            letterSpacing: '1px',
            mb: 8,
            fontSize: { xs: '2rem', md: '3.5rem' },
            background: `linear-gradient(135deg, #fff 0%, ${purplePrimary} 100%)`,
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Interactive online quizzes <br/> at <span style={{ borderBottom: `3px solid ${purplePrimary}` }}>your pace</span>
        </Typography>
        <Grid
          container
          spacing={2}
          wrap="nowrap"
          overflowX="auto"
          sx={{
            pb: 2,
            justifyContent: 'center',
          }}
        >
          {featuresData.map((item, index) => (
            <Grid
              item
              key={index}
              xs={12}
              sm={6}
              md={4}
              sx={{
                flexShrink: 0,
                width: { xs: '80vw', sm: '45vw', md: '300px' },
              }}
            >
              <Card
                sx={{
                  height: '100%',
                  background: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: '16px',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
                  transition: 'transform 0.3s ease',
                  '&:hover': { transform: 'scale(1.03)' },
                  p: 2,
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="overline" sx={{ color: '#aaa', display: 'block', mb: 0.5 }}>
                    MODULE {index + 1}
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: '#fff' }}>
                    {item.title}
                  </Typography>
                  <Box sx={{ mt: 2, mb: 2, display: 'flex', justifyContent: 'center' }}>
                    <img
                      src={item.imageSrc}
                      alt={item.imageAlt}
                      style={{
                        width: '100%',
                        maxWidth: '200px',
                        height: '100px',
                        borderRadius: '8px',
                        boxShadow: '0 0 10px rgba(25, 118, 210, 0.5)',
                        objectFit: 'cover',
                      }}
                    />
                  </Box>
                  <Typography variant="body2" sx={{ color: 'white', flexGrow: 1 }}>
                    {item.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

       {/* Steps Section - Ultra Compact Design */}
      <Container maxWidth="lg" sx={{ my: 4 }}>
        <Typography
          variant="h2"
          align="center"
          gutterBottom
          sx={{
            fontWeight: 800,
            letterSpacing: '1px',
            mb: 3,
            fontSize: { xs: '1.5rem', md: '2rem' },
            color: '#fff',
          }}
        >
         Start in 3 steps
        </Typography>

        <Grid
          container
          spacing={2}
          alignItems="stretch"
          sx={{
            flexWrap: { xs: 'wrap', sm: 'nowrap'  }, 
          }}
        >
          {steps.map((step, index) => (
            <Grid
              item
              xs={12}
              sm={4}
              key={index}
              sx={{
                flexShrink: 0,
                width: { xs: '100%', sm: '33.33%' }, 
              }}
            >
              <Box
                sx={{
                  position: 'relative',
                  height: '100%',
                  minHeight: '220px', 
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                {/* Large Number Background */}
                <Typography
                  variant="h1"
                  sx={{
                    fontSize: { xs: '3rem', sm: '4rem' }, // 
                    fontWeight: 800,
                    color: step.color,
                    opacity: 0.2,
                    lineHeight: 0.8,
                    mb: 0.5,
                    textAlign: 'left',
                    userSelect: 'none',
                    position: 'relative',
                    zIndex: 1,
                  }}
                >
                  {step.number}
                </Typography>

                {/* Content Card */}
                <Card
                  sx={{
                    background: 'rgba(255, 255, 255, 0.08)',
                    backdropFilter: 'blur(20px)',
                    borderRadius: '14px',
                    border: `2px solid ${step.color}`,
                    boxShadow: `0 4px 16px rgba(0,0,0,0.3)`,
                    mt: -3,
                    position: 'relative',
                    zIndex: 2,
                    flexGrow: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    cursor: 'pointer',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: `0 8px 24px rgba(0,0,0,0.4), 0 0 12px ${step.color}40`,
                    },
                  }}
                  onClick={() => navigate(step.route)}
                >
                  <CardContent
                    sx={{
                      p: 2, // Further reduced from 3
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                    }}
                  >
                    <Box>
                      {/* Icon */}
                      <Box
                        sx={{
                          fontSize: '1.5rem', // Reduced from 2rem
                          mb: 1,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'flex-start',
                        }}
                      >
                        <Box
                          sx={{
                            background: `linear-gradient(135deg, ${step.color}20, ${step.color}10)`,
                            p: 1,
                            borderRadius: '8px',
                            border: `1px solid ${step.color}30`,
                          }}
                        >
                          {step.icon}
                        </Box>
                      </Box>

                      {/* Title */}
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 600,
                          color: '#fff',
                          mb: 1,
                          lineHeight: 1.2,
                          fontSize: { xs: '1rem', sm: '1.2rem' },
                        }}
                      >
                        {step.title}
                      </Typography>

                      {/* Subtitle */}
                      <Typography
                        variant="body2"
                        sx={{
                          color: '#ccc',
                          lineHeight: 1.4,
                          mb: 2,
                          fontSize: { xs: '0.8rem', sm: '0.9rem' },
                        }}
                      >
                        {step.subtitle}
                      </Typography>
                    </Box>

                    {/* Action Button */}
                    <Button
                      variant="contained"
                      size="small"
                      sx={{
                        bgcolor: step.color,
                        color: step.color === '#ffd43b' ? '#1a1a2e' : '#fff',
                        fontWeight: 700,
                        borderRadius: '8px',
                        padding: '6px 16px',
                        fontSize: '0.8rem',
                        textTransform: 'none',
                        boxShadow: `0 2px 8px ${step.color}40`,
                        alignSelf: 'flex-start',
                        '&:hover': {
                          bgcolor: step.color,
                          filter: 'brightness(1.1)',
                          transform: 'translateY(-2px)',
                          boxShadow: `0 4px 12px ${step.color}60`,
                        },
                        transition: 'all 0.3s ease',
                      }}
                    >
                      {step.action}
                    </Button>
                  </CardContent>
                </Card>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Test Section */}
      <Container id="test" maxWidth="lg" sx={{ my: 12 }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: 'center',
            mt: 8,
            gap: 4,
          }}
        >
          <Box
            sx={{
              flex: 1,
              position: 'relative',
              '& img': {
                width: '100%',
                height: 'auto',
                borderRadius: '16px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
              },
            }}
          >
            <img
              src={chapeau}
              alt="People smiling"
            />
          </Box>
          <Box
            sx={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <Typography
              variant="h2"
              sx={{
                fontWeight: 700,
                color: '#fff',
                mb: 2,
                lineHeight: 1.2,
              }}
            >
             Ready to start your journey?
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: '#ccc',
                mb: 4,
              }}
            >
            A quick and personalized test to help you make an informed decision and confidently start your journey
            </Typography>
            <Button
              variant="contained"
              size="large"
              sx={{
                bgcolor: purplePrimary,
                color: '#fff',
                fontWeight: 700,
                padding: '12px 40px',
                borderRadius: '25px',
                '&:hover': {
                  bgcolor: '#e67c36',
                  transform: 'translateY(-5px)',
                  boxShadow: '0 20px 50px rgba(251, 142, 64, 0.5)',
                },
              }}
              onClick={() => navigate('/login')}
            >
              Start the test
            </Button>
          </Box>
        </Box>
      </Container>

      {/* Footer */}
      <Box sx={{ mt: 10, py: 4, color: '#888' }}>
        <Typography variant="body2">© 2025 Guidance. All rights reserved.</Typography>
      </Box>
    </Box>
    </>
  );
}