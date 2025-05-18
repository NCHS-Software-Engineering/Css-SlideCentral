// src/pages/Home.js

import React, { useEffect, useState } from 'react';
import { Box, Grid, Button, Typography, Container } from '@mui/material';
import { keyframes } from '@emotion/react';
import { Link } from 'react-router-dom';
import Logo from '../images/homePageLogo.png';
import '../styles/styles.css';
// Fade-in animation
const fadeIn = keyframes`
  from { opacity: 0; }
  to   { opacity: 1; }
`;

// Red button style
const redButtonStyle = {
  backgroundColor: '#b71c1c',
  color: '#fff',
  textTransform: 'none',
  transition: 'transform 0.3s, background-color 0.3s',
  whiteSpace: 'nowrap',
  fontSize: { xs: '0.875rem', md: '0.75rem' },
  '&:hover': {
    backgroundColor: '#7f0000',
    transform: 'scale(1.05)',
  },
};

const Home = () => {
  const [LOGGED_IN, setLOGGED_IN] = useState(false);
  const [role, setRole]         = useState('');

  // Kick off Google OAuth
  const handleLogin = () => {
    window.location.href = 'http://localhost:8500/signin-google';
  };

  // Destroy session
  const handleLogout = () => {
    if (window.confirm('Are you sure you want to log out?')) {
      fetch('http://localhost:8500/logout', {
        method: 'GET',
        credentials: 'include',
      })
        .then(res => {
          if (res.ok) {
            setLOGGED_IN(false);
            window.location.href = '/';
          }
        })
        .catch(console.error);
    }
  };

  // Check login on mount
  useEffect(() => {
    fetch('http://localhost:8500/auth/status', {
      method: 'GET',
      credentials: 'include',
    })
      .then(r => r.json())
      .then(data => setLOGGED_IN(data.loginVerified))
      .catch(console.error);
  }, []);

  // Grab role once logged in
  useEffect(() => {
    fetch('http://localhost:8500/account/info', {
      method: 'GET',
      credentials: 'include',
    })
      .then(r => r.json())
      .then(data => {
        if (data.role) setRole(data.role);
      })
      .catch(console.error);
  }, []);

  return (
    <>
     <Helmet>
    <title>Home</title>
    <meta charSet="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="description" content="Learn web development with tutorials and tips." />
  <meta name="author" content="Isaac Liu" />
   </Helmet>
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: '#f0f0f0',
        animation: `${fadeIn} 0.7s ease-in-out`,
      }}
    >
      <a href="#main" className="skip-link">Skip to main content</a>

      {/* TOP NAV */}
      <Box sx={{ background: 'linear-gradient(to bottom, #444, #ccc)', p: 2 }}>
        <Container maxWidth="lg">
          <Grid container spacing={2} alignItems="center" justifyContent="center">

            {/* LEFT */}
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
                {/* Admin only */}
                {/*{role === 'Admin' && (*/}
                  <>
                    <Button
                      component={Link}
                      to="/activities"
                      variant="contained"
                      sx={redButtonStyle}
                    >
                      Enter Activity
                    </Button>

                    <Button
                      component={Link}
                      to="/edit-activities"
                      variant="contained"
                      sx={redButtonStyle}
                    >

                      Edit Activities
                    </Button>
                  </>
                {/*{)}*/}

                {/* Logged in only */}
                {/*{LOGGED_IN && (*/}

                  <Button
                    component={Link}
                    to="/slideshow"
                    variant="contained"
                    sx={redButtonStyle}
                  >
                    Slideshow
                  </Button>
                {/*)}*/}

                {/* Always visible */}
                <Button
                  component={Link}
                  to="/developers"
                  variant="contained"
                  sx={redButtonStyle}
                >

                  Developers
                </Button>
              </Box>
            </Grid>

            {/* CENTER LOGO */}
            <Grid item xs={12} md={4} container justifyContent="center">
              <img
                src={Logo}
                alt="Logo"
                style={{ maxWidth: '100%', height: 'auto', objectFit: 'contain' }}
              />
            </Grid>

            {/* RIGHT */}
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

                {/*{LOGGED_IN && (*/}
                  <Button
                    component={Link}
                    to="/account"
                    variant="contained"
                    sx={redButtonStyle}
                  >
                    My Account
                  </Button>
                {/*)}*/}

                {/*{(role === 'Teacher' || role === 'Admin') && (*/}
                  <>
                    <Button variant="contained" sx={redButtonStyle}>
                      CSS Preview
                    </Button>
                    <Button variant="contained" sx={redButtonStyle}>
                      Preview Edit
                    </Button>
                  </>
                {/*)}*/}

                {/*{LOGGED_IN && (*/}
                  <Button
                    component={Link}
                    to="/calendar"
                    variant="contained"
                    sx={redButtonStyle}
                  >
                    Calendar
                  </Button>
                {/*)}*/}
              </Box>
            </Grid>

          </Grid>
        </Container>
      </Box>

      {/* MAIN CONTENT */}
      <Container id="main" maxWidth="md" sx={{ py: 6 }}>

        <Grid container spacing={4} alignItems="center">
          {/* TEXT */}
          <Grid item xs={12} md={8}>
          <Typography
  variant="h5"
  component="h1"
  textAlign="center"
  gutterBottom
  sx={{ fontWeight: 'bold' }}
>
              CSS/Slide Central is an application that can be used by teachers and activity sponsors to display information around the school.
            </Typography>
            <Typography variant="body1" textAlign="center" paragraph>
              A clock, countdown to the next period, schedule, and list of activities happening at the school are all available within the application.
            </Typography>
            <Typography variant="body1" textAlign="center">
              To learn more, click on the buttons on the right.
            </Typography>
          </Grid>

          {/* WIDGET / FAQ / TUTORIAL */}
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
                sx={{ backgroundColor: '#fff', color: '#000', '&:hover': { backgroundColor: '#f5f5f5' } }}
                onClick={() => window.open('/WidgetPage', '_blank')}
              >
                Learn more about Widgets
              </Button>
              <Button
                variant="contained"
                sx={{ backgroundColor: '#fff', color: '#000', '&:hover': { backgroundColor: '#f5f5f5' } }}
                component={Link}
                to="/faq"
              >
                FAQ
              </Button>
              <Button
                variant="contained"
                sx={{ backgroundColor: '#fff', color: '#000', '&:hover': { backgroundColor: '#f5f5f5' } }}
                onClick={() => window.open('/files/Tutorial.pdf', '_blank')}
              >
                Tutorial
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
    </>
  );
};

export default Home;