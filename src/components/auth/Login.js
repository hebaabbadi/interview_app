import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Link,
  TextField,
  Paper,
  IconButton,
  InputAdornment,
  Fade,
  Slide,
  Container,
  useMediaQuery,
  useTheme,
  CssBaseline,
} from "@mui/material";
import { useNavigate } from 'react-router-dom';
import dev from "../../assets/dev.png";

export default function Home() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleLogin = async () => {
    setIsLoading(true);
    setError("");

    // Check for admin credentials first
    if (email === "admin@gmail.com" && password === "admin") {
      setTimeout(() => {
        navigate("/admin");
        setIsLoading(false);
      }, 1000); // Simulate async delay for UX consistency
      return;
    }

    // Proceed with API call for regular users
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Login failed");
      }

      // Store token for regular users
      localStorage.setItem("token", data.token);

      // Navigate to profile/dashboard for regular users
      navigate("/Profile");
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOrientationClick = () => {
    navigate('/');
  };

  return (
    <>
      <CssBaseline />
      <Box 
        sx={{ 
          minHeight: "100vh", 
          bgcolor: '#27283D',
          position: 'relative',
          overflow: 'hidden',
          margin: 0,
          padding: 0,
        }}
      >
        {/* Top Navigation */}
        <AppBar 
          position="static" 
          elevation={0}
          sx={{ 
            bgcolor: "rgba(251, 142, 64, 0.1)",
            backdropFilter: "blur(10px)",
            borderBottom: '1px solid rgba(251, 142, 64, 0.2)',
          }}
        >
          <Toolbar sx={{ justifyContent: "space-between" }}>
            <Box 
              sx={{ display: 'flex', alignItems: 'center', gap: 1, cursor: 'pointer' }} 
              onClick={handleOrientationClick}
            >
              <Typography sx={{ color: '#fb8e40', fontSize: '2rem' }}>🎓</Typography>
              <Typography 
                variant="h5" 
                sx={{ 
                  fontWeight: 700,
                  color: '#fb8e40',
                  textShadow: '0 2px 4px rgba(251, 142, 64, 0.3)',
                }}
              >
                ORIENTATION
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Button 
                variant="outlined"
                sx={{ 
                  borderColor: '#fb8e40',
                  color: '#fb8e40',
                  fontWeight: 600,
                  px: 3,
                  '&:hover': {
                    borderColor: '#fb8e40',
                    bgcolor: 'rgba(251, 142, 64, 0.1)',
                    transform: 'translateY(-2px)',
                  },
                  transition: 'all 0.3s ease',
                }}
                onClick={() => navigate('/SignIn')}
              >
                SIGN UP
              </Button>
            </Box>
          </Toolbar>
        </AppBar>

        {/* Main Content */}
        <Container maxWidth="xl" sx={{ py: 4 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "calc(100vh - 120px)",
            }}
          >
            <Paper
              sx={{
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(20px)',
                boxShadow: '0 20px 60px rgba(0,0,0,0.3), 0 0 0 1px rgba(251, 142, 64, 0.1)',
                maxWidth: 1200,
                width: "100%",
                borderRadius: 4,
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                overflow: "hidden",
                position: 'relative',
              }}
            >
              {/* Form Section */}
              <Box
                sx={{
                  flex: 1,
                  p: { xs: 3, md: 5 },
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  gap: 3,
                  background: 'linear-gradient(135deg, rgba(39, 40, 61, 0.02) 0%, rgba(251, 142, 64, 0.02) 100%)',
                }}
              >
                {/* Header */}
                <Box sx={{ textAlign: 'center', mb: 2 }}>
                  <Typography 
                    variant="h3" 
                    sx={{ 
                      fontWeight: 700,
                      color: '#27283D',
                      mb: 1,
                      textShadow: '0 2px 4px rgba(39, 40, 61, 0.1)',
                    }}
                  >
                    Welcome
                  </Typography>
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      color: '#fb8e40',
                      fontWeight: 500,
                    }}
                  >
                    Log in to your future.
                  </Typography>
                </Box>

                {/* Email Field */}
                <TextField
                  label="Email"
                  type="email"
                  fullWidth
                  variant="outlined"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  error={!!error}
                />

                {/* Password Field */}
                <TextField
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  fullWidth
                  variant="outlined"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  error={!!error}
                  helperText={error}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                          sx={{ 
                            color: '#27283D',
                            fontSize: '1.2rem',
                          }}
                        >
                          {showPassword ? "🙈" : "👁️"}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />

                {/* Login Button */}
                <Button
                  variant="contained"
                  fullWidth
                  onClick={handleLogin}
                  disabled={isLoading}
                  sx={{
                    py: 1.8,
                    fontSize: "1.1rem",
                    fontWeight: 700,
                    mt: 2,
                    borderRadius: 2,
                    background: 'linear-gradient(135deg, #fb8e40 0%, #ff6b35 100%)',
                    boxShadow: '0 8px 25px rgba(251, 142, 64, 0.4)',
                    textTransform: 'none',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #e8803a 0%, #e55a2b 100%)',
                      boxShadow: '0 12px 35px rgba(251, 142, 64, 0.6)',
                      transform: 'translateY(-3px)',
                    },
                    '&:disabled': {
                      background: '#ccc',
                      color: '#666',
                    },
                    transition: 'all 0.3s ease',
                  }}
                >
                  {isLoading ? "Log IN in progress..." : "LOGIN"}
                </Button>

                {/* Sign Up Link */}
                <Typography variant="body2" align="center" sx={{ mt: 2, color: '#27283D' }}> 
                 Don’t have an account yet ? {" "}
                  <Link 
                    href="#" 
                    underline="hover"
                    sx={{
                      color: '#fb8e40',
                      fontWeight: 600,
                      '&:hover': {
                        color: '#e8803a',
                      },
                    }}
                    onClick={() => navigate('/SignIn')}
                  >
                    Sign up
                  </Link>
                </Typography>
              </Box>

              {/* Image Section */}
              <Box
                sx={{
                  flex: 1.2,
                  background: 'linear-gradient(135deg, #27283D 0%, #3a3b56 100%)',
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  p: { xs: 3, md: 4 },
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                {/* Decorative Elements */}
                <Box
                  sx={{
                    position: 'absolute',
                    top: '15%',
                    right: '10%',
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #fb8e40, #ff6b35)',
                    opacity: 0.3,
                  }}
                />
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: '15%',
                    left: '10%',
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #fb8e40, #ff6b35)',
                    opacity: 0.2,
                  }}
                />

                {/* Main Image Container */}
                <Box
                  sx={{
                    position: 'relative',
                    borderRadius: 4,
                    overflow: 'hidden',
                    background: 'linear-gradient(135deg, rgba(251, 142, 64, 0.1), rgba(255, 107, 53, 0.1))',
                    boxShadow: '0 15px 40px rgba(251, 142, 64, 0.3)',
                    transform: 'perspective(1000px) rotateY(-5deg)',
                  }}
                >
                  <Box
                    component="img"
                    src={dev}
                    alt="Login Illustration"
                    sx={{
                      width: "100%",
                      height: "auto",
                      maxHeight: { xs: 300, md: 500 },
                      objectFit: "cover",
                      display: 'block',
                    }}
                  />
                </Box>
              </Box>
            </Paper>
          </Box>
        </Container>
      </Box>
    </>
  );
}