// src/pages/Home.js
import React, { useEffect, useState } from 'react';
import { Box, Grid, Button, Typography, Container } from '@mui/material';
import { keyframes } from '@emotion/react';
import { Link } from 'react-router-dom';
import Logo from '../images/homePageLogo.png';

// Fade-in animation for the whole page
const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

// Red button style with responsive font size
const redButtonStyle = {
  backgroundColor: 'red',
  color: '#fff',
  textTransform: 'none',
  transition: 'transform 0.3s, background-color 0.3s',
  whiteSpace: 'nowrap',
  // Use a slightly larger font on mobile (xs) and smaller on desktop (md)
  fontSize: { xs: '0.875rem', md: '0.75rem' },
  '&:hover': {
    backgroundColor: '#b71c1c',
    transform: 'scale(1.05)',
  },
};

const Home = () => {
  // Session and role state
  const [LOGGED_IN, setLOGGED_IN] = useState(false);
  const [role, setRole] = useState('');

  // Handle login redirection
  const handleLogin = () => {
    window.location.href = 'http://localhost:8500/signin-google';
  };

  // Handle logout with confirmation and session destruction
  const handleLogout = () => {
    if (window.confirm("Are you sure you want to log out?")) {
      fetch("http://localhost:8500/logout", {
        method: "GET",
        credentials: "include",
      })
        .then((res) => {
          if (res.ok) {
            setLOGGED_IN(false);
          }
        });
      window.location.href = 'http://localhost:8500/logout';
    }
  };


  // Retrieve login status from the server
  useEffect(() => {
    fetch("http://localhost:8500/auth/status", {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setLOGGED_IN(data.loginVerified);
      })
      .catch((err) => console.error("Auth status error:", err));
  }, []);

  // Retrieve user role info from the server
  useEffect(() => {
    fetch("http://localhost:8500/account/info", {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.role) {
          setRole(data.role);
        }
      })
      .catch((err) => console.error("Account info error:", err));
  }, []);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: '#f0f0f0',
        animation: `${fadeIn} 0.7s ease-in-out`,
      }}
    >
      {/* TOP SECTION */}
      <Box sx={{ background: 'linear-gradient(to bottom, #777, #ddd)', p: 2 }}>
        <Container maxWidth="lg">
          <Grid container spacing={2} alignItems="center" justifyContent="center">
            {/* Left Side Buttons - On top in mobile */}
            <Grid item xs={12} md={4}>
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: {
                    xs: 'repeat(auto-fit, minmax(120px, 1fr))',
                    sm: 'repeat(4, auto)',
                  },
                  gap: 1,
                  justifyContent: 'center',
                }}
              >
                {role === "Admin" && (
                  <>
                    <Button component={Link} to="/activities" variant="contained" sx={redButtonStyle}>
                      Enter Activity
                    </Button>
                    <Button variant="contained" sx={redButtonStyle}>
                      Edit Activities
                    </Button>
                  </>
                )}
                
                {LOGGED_IN && (
                <Button variant="contained" sx={redButtonStyle}>
                  Slideshow
                </Button>)}
                <Button variant="contained" sx={redButtonStyle}>
                  Developers
                </Button>
              </Box>
            </Grid>


            {/* Logo */}
            <Grid item xs={12} md={4} container justifyContent="center">
              <img
                src={Logo}
                alt="Logo"
                style={{ maxWidth: '100%', height: 'auto', objectFit: 'contain' }}
              />
            </Grid>

            {/* Right Side Buttons - On bottom in mobile */}
            <Grid item xs={12} md={4}>
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: {
                    xs: 'repeat(auto-fit, minmax(120px, 1fr))',
                    sm: 'repeat(4, auto)',
                  },
                  gap: 1,
                  justifyContent: 'center',
                }}
              >
                {LOGGED_IN ? (
                  <Button variant="contained" sx={redButtonStyle} onClick={handleLogout}>
                    Log Out
                  </Button>
                ) : (
                  <Button variant="contained" sx={redButtonStyle} onClick={handleLogin}>
                    Login
                  </Button>
                )}

                {LOGGED_IN && (
                  <Button component={Link} to="/account" variant="contained" sx={redButtonStyle}>
                    My Account
                  </Button>
                  )}

                {(role === "Teacher" || role === "Admin") && (
                  <>
                <Button variant="contained" sx={redButtonStyle}>
                  CSS Preview
                </Button>
                <Button variant="contained" sx={redButtonStyle}>
                  Preview Edit
                </Button>
                </>
                )}
                
                {LOGGED_IN && (
                <Button component={Link} to="/calendar" variant="contained" sx={redButtonStyle}>
                  Calendar
                </Button>
                )}
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* MAIN CONTENT */}
      <Container maxWidth="md" sx={{ py: 6 }}>
        <Grid container spacing={4} alignItems="center">
          {/* Text Section */}
          <Grid item xs={12} md={8}>
            <Typography variant="h5" textAlign="center" gutterBottom sx={{ fontWeight: 'bold' }}>
              CSS/Slide Central is an application that can be used by teachers and activity sponsors to display information around the school.
            </Typography>
            <Typography variant="body1" textAlign="center" paragraph>
              A clock, countdown to the next period, schedule, and list of activities happening at the school are all available within the application.
            </Typography>
            <Typography variant="body1" textAlign="center">
              To learn more, click on the buttons on the right.
            </Typography>
          </Grid>

          {/* Widget Buttons */}
          <Grid item xs={12} md={4}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                alignItems: 'center',
              }}
            >
              <Button
                variant="contained"
                sx={{
                  backgroundColor: '#fff',
                  color: '#000',
                  '&:hover': { backgroundColor: '#f5f5f5' },
                }}
                onClick={() => window.open('/WidgetPage', '_blank')}
              >
                Learn more about Widgets
              </Button>

              <Button
                variant="contained"
                sx={{
                  backgroundColor: '#fff',
                  color: '#000',
                  '&:hover': { backgroundColor: '#f5f5f5' },
                }}
                onClick={() => window.open('/faq', '_blank')}
              >
                FAQ
              </Button>

              <Button
                variant="contained"
                sx={{
                  backgroundColor: '#fff',
                  color: '#000',
                  '&:hover': { backgroundColor: '#f5f5f5' },
                }}
                onClick={() => window.open('/files/Tutorial.pdf', '_blank')}
              >
                Tutorial
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Home;
