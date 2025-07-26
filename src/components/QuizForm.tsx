import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box, Button, CircularProgress, Typography, FormControl, FormControlLabel,
  RadioGroup, Radio, Grid, GridProps, AppBar, Toolbar, CssBaseline,
  Container, useTheme, useMediaQuery, Card, CardContent
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import API_URL from '../config';
import { FieldOption, QuizResult } from '../types';
import { GlobalStyles } from '@mui/material';


interface Question {
  question: string;
  options: string[];
  correctAnswer: string;
  field: string;
  difficulty: number;
}

interface Props {
  onResult: (data: QuizResult) => void;
  selectedFields: FieldOption[];
  onResetSelection: () => void;
}

const accentColor = '#fb8e40';


const QuizForm: React.FC<Props> = ({ onResult, selectedFields, onResetSelection }) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);




  useEffect(() => {
    const generateQuiz = async () => {
      try {
        setLoading(true);
        const resp = await axios.post(`${API_URL}/generate`, {
          fields: selectedFields.map(f => f.value)
        });
        setQuestions(resp.data.questions);
      } catch (err) {
        console.error(err);
        setError('Failed to generate quiz.');
      } finally {
        setLoading(false);
      }
    };
    generateQuiz();
  }, [selectedFields]);

  const handleSubmit = async () => {
    if (Object.keys(answers).length !== questions.length) {
      setError('Please answer all questions.');
      return;
    }
    try {
      setSubmitting(true);
      const resp = await axios.post(`${API_URL}/evaluate`, { answers, questions });
      onResult(resp.data);
    } catch (err) {
      console.error(err);
      setError('Failed to submit quiz.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    navigate('/login');
  };

  const handleOrientationClick = () => {
    navigate('/profile');
  };

  if (loading) return (
    <Box sx={{ textAlign: 'center', py: 5, color: '#fff', width: '100%' }}>
      <CircularProgress sx={{ color: accentColor }} />
    </Box>
  );
  if (error) return (
    <Typography color="error" align="center" sx={{ color: '#fff', py: 5, width: '100%' }}>
      {error}
    </Typography>
  );

  return (
   <Box
  sx={{
    background: 'linear-gradient(135deg, #0f0f23 0%, #1a1a2e 30%, #2c1e4a 100%)',
    color: '#fff',
    fontFamily: '"Inter", "Roboto", sans-serif',
    minHeight: '100vh',
    position: 'relative',
    overflow: 'hidden',
    margin: 0,
    padding: 0,
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
      <GlobalStyles
  styles={{
    html: { margin: 0, padding: 0, backgroundColor: '#0f0f23' },
    body: { margin: 0, padding: 0, backgroundColor: '#0f0f23' },
  }}
/>

      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          // // background: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23fb8e40' fill-opacity='0.02'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          // pointerEvents: 'none',
        }}
      />
      <Box sx={{ position: 'relative', zIndex: 1, width: '100%' }}>
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
            backgroundColor: '#0f0f23',
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
              px: { xs: 2, md: 4 },
              width: '100%',
              maxWidth: 'none',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                '&:hover': { transform: 'translateY(-2px)' }
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
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
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

        <Container maxWidth={false} sx={{ py: 4, px: { xs: 2, md: 4 }, width: '100%' }}>
          <Typography
            variant="h3"
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
            Quiz
          </Typography>
          <Grid container spacing={3} sx={{ width: '100%', mx: 0 }}>
            {questions.map((q, i) => (
              <Grid item xs={12} key={i} component="div" {...({ item: true } as GridProps)}>
                <Card
                  sx={{
                    background: 'rgba(255, 255, 255, 0.08)',
                    backdropFilter: 'blur(20px)',
                    borderRadius: '16px',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    p: 3,
                    transition: 'all 0.3s ease',
                    width: '100%',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      boxShadow: '0 15px 40px rgba(0,0,0,0.4)',
                    }
                  }}
                >
                  <CardContent>
                    <Typography
                      variant="h6"
                      sx={{ color: accentColor, fontWeight: 700, mb: 2 }}
                    >
                      Q{i + 1}: {q.question} ({q.field})
                    </Typography>
                    <FormControl component="fieldset" sx={{ width: '100%' }}>
                      <RadioGroup
                        value={answers[i] || ''}
                        onChange={e => setAnswers(prev => ({ ...prev, [i]: e.target.value }))}
                      >
                        {q.options.map((opt, idx) => (
                          <FormControlLabel
                            key={idx}
                            value={String.fromCharCode(65 + idx)}
                            control={<Radio sx={{ color: 'rgba(255,255,255,0.7)', '&.Mui-checked': { color: accentColor } }} />}
                            label={
                              <Typography sx={{ color: 'rgba(255,255,255,0.9)' }}>
                                {String.fromCharCode(65 + idx)}) {opt}
                              </Typography>
                            }
                          />
                        ))}
                      </RadioGroup>
                    </FormControl>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          <Box sx={{ textAlign: 'center', mt: 4, width: '100%' }}>
            <Button
              variant="outlined"
              onClick={onResetSelection}
              sx={{
                borderRadius: '15px',
                borderColor: 'rgba(255,255,255,0.2)',
                color: '#fff',
                fontWeight: 600,
                px: 4,
                py: 1.5,
                mr: 2,
                transition: 'all 0.3s ease',
                '&:hover': {
                  borderColor: accentColor,
                  background: 'rgba(255,255,255,0.1)',
                  transform: 'translateY(-2px)',
                }
              }}
            >
              Change Fields
            </Button>
            <Button
              variant="contained"
              disabled={submitting}
              onClick={handleSubmit}
              sx={{
                borderRadius: '15px',
                bgcolor: accentColor,
                color: '#fff',
                fontWeight: 700,
                px: 4,
                py: 1.5,
                transition: 'all 0.3s ease',
                '&:hover': {
                  bgcolor: '#e67c36',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 10px 20px rgba(251, 142, 64, 0.3)',
                },
                '&:disabled': {
                  bgcolor: 'rgba(255,255,255,0.3)',
                }
              }}
            >
              {submitting ? <CircularProgress size={24} sx={{ color: '#fff' }} /> : 'Submit Quiz'}
            </Button>
          </Box>
        </Container>

        <Box
          sx={{
            mt: 8,
            py: 4,
            textAlign: 'center',
            width: '100%',
          }}
        >
          <Typography
            variant="body2"
            sx={{ color: 'rgba(255,255,255,0.6)', fontSize: '1rem' }}
          >
            © 2025 Orientation. All rights reserved.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default QuizForm;