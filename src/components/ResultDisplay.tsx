import React from 'react';
import { Box, Button, Typography, Paper, Card, CardContent, LinearProgress, Grid, GridProps, CssBaseline } from '@mui/material';
import { GlobalStyles } from '@mui/material';
import { FieldOption, QuizResult } from '../types';

interface Props {
  result: QuizResult;
  onRetake: () => void;
  selectedFields: FieldOption[];
}

const accentColor = '#fb8e40';

const ResultDisplay: React.FC<Props> = ({ result, onRetake, selectedFields }) => {
  const getLabel = (key: string) => selectedFields.find(f => f.value === key)?.label || key;

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
      <Box sx={{ position: 'relative', zIndex: 1, maxWidth: 800, mx: 'auto', p: 3 }}>
        <Typography
          variant="h4"
          align="center"
          sx={{
            fontWeight: 800,
            background: `linear-gradient(135deg, #fff 0%, ${accentColor} 100%)`,
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            mb: 4,
          }}
        >
          Results - Level {result.currentLevel}
        </Typography>

        <Paper
          sx={{
            p: 3,
            background: 'rgba(255, 255, 255, 0.08)',
            backdropFilter: 'blur(20px)',
            borderRadius: '16px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
            border: '1px solid rgba(255,255,255,0.1)',
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'translateY(-5px)',
              boxShadow: '0 15px 40px rgba(0,0,0,0.4)',
            },
          }}
        >
          <Typography variant="h6" sx={{ color: accentColor, fontWeight: 700, mb: 2 }}>
            Your Scores:
          </Typography>
          <Grid container spacing={2}>
            {Object.entries(result.scores).map(([key, val]) => (
              <Grid item xs={12} key={key} component="div" {...({ item: true } as GridProps)}>
                <Card
                  sx={{
                    background: 'rgba(255, 255, 255, 0.08)',
                    backdropFilter: 'blur(20px)',
                    borderRadius: '12px',
                    border: '1px solid rgba(255,255,255,0.1)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-3px)',
                      boxShadow: '0 8px 20px rgba(0,0,0,0.3)',
                    },
                  }}
                >
                  <CardContent>
                    <Typography sx={{ color: 'rgba(255,255,255,0.9)', fontWeight: 600 }}>
                      {getLabel(key)}
                    </Typography>
                    <LinearProgress
                      variant="determinate"
                      value={val}
                      sx={{
                        height: 10,
                        mt: 1,
                        backgroundColor: 'rgba(255,255,255,0.1)',
                        '& .MuiLinearProgress-bar': {
                          backgroundColor: accentColor,
                        },
                      }}
                    />
                    <Typography align="right" sx={{ color: 'rgba(255,255,255,0.9)' }}>
                      {val}%
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          <Typography variant="h6" sx={{ color: accentColor, fontWeight: 700, mt: 2 }}>
            Recommendation:
          </Typography>
          <Typography sx={{ color: 'rgba(255,255,255,0.9)' }}>
            {result.recommendation}
          </Typography>

          {result.nextLevel && (
            <Typography sx={{ color: '#4caf50', mt: 2 }}>
              Congratulations! You can proceed to Level {result.currentLevel + 1}.
            </Typography>
          )}
        </Paper>

        <Box sx={{ textAlign: 'center', mt: 3 }}>
          <Button
            variant="contained"
            onClick={onRetake}
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
            }}
          >
            {result.nextLevel && result.currentLevel < 3 ? 'Proceed / Retake' : 'Retake Quiz'}
          </Button>
        </Box>

        <Box sx={{ mt: 8, py: 4, textAlign: 'center' }}>
          <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.6)', fontSize: '1rem' }}>
            © 2025 Orientation. All rights reserved.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default ResultDisplay;