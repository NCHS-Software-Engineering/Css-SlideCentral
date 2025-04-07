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

// Red button style
const redButtonStyle = {
  backgroundColor: 'red',
  color: '#fff',
  textTransform: 'none',
  transition: 'transform 0.3s, background-color 0.3s',
  '&:hover': {
    backgroundColor: '#b71c1c',
    transform: 'scale(1.05)',
  },
};

const Home = () => {
  // Session indicator for user login status
  const [LOGGED_IN, setLOGGED_IN] = useState(false);
  // User's role retrieved from the server
  const [role, setRole] = useState('');

  // Handle login redirection
  const handleLogin = () => {
    window.location.href = 'http://localhost:8500/signin-google';
  };

  // Handle logout with confirmation and session destruction
  const handleLogout = () => {
    if (confirm("Are you sure you want to log out?")) {
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
        console.log("Auth status response:", data);
        setLOGGED_IN(data.loginVerified);
      })
      .catch((err) => console.error("Auth status error:", err));
  }, []);

  // Retrieve the user's role from the server
  useEffect(() => {
    fetch("http://localhost:8500/account/info", {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setRole(data.role);
      });
  }, []);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: '#f0f0f0',
        animation: `${fadeIn} 0.7s ease-in-out`,
      }}
    >
      {/*
        LIST OF PAGES FOR EACH ROLE'S RESPECTIVE ACCESS:
        - Logged Out User: Developers
        - Student: Developers, Calendar
        - Teacher: Developers, Calendar, Preview and Preview Edit
        - Admin: Developers, Calendar, Preview and Preview Edit, Enter and Edit Activities
      */}

      {/* TOP BAR */}
      <Box sx={{ background: 'linear-gradient(to bottom, #777, #ddd)', p: 1 }}>
        <Container maxWidth="lg">
          <Grid container alignItems="center">
            {/* Left Side Buttons */}
            <Grid item xs={4}>
              <Box sx={{ display: 'flex', gap: '0.5rem', flexWrap: 'nowrap' }}>
                {role === "Admin" && (
                  <Button component={Link} to="/activities" variant="contained" sx={redButtonStyle}>
                    Enter Activity
                  </Button>
                )}
                {LOGGED_IN && (
                  <Button variant="contained" sx={redButtonStyle}>
                    Slideshow
                  </Button>
                )}
                <Button variant="contained" sx={redButtonStyle}>
                  Developers
                </Button>
                {role === "Admin" && (
                  <Button variant="contained" sx={redButtonStyle}>
                    Edit Activities
                  </Button>
                )}
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

            {/* Right Side: Login and Additional Buttons */}
            <Grid item xs={4} container justifyContent="flex-end">
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                <Button
                  id="LoginID"
                  onClick={LOGGED_IN ? handleLogout : handleLogin}
                  variant="contained"
                  sx={{ ...redButtonStyle, mt: 1 }}
                >
                  {LOGGED_IN ? "Log Out" : "Login"}
                </Button>
                {LOGGED_IN && (
                  <Button component={Link} to="/account" variant="contained" sx={{ ...redButtonStyle, mt: 1 }}>
                    My Account
                  </Button>
                )}
                <Box sx={{ mt: 1, display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                  {(role === "Teacher" || role === "Admin") && (
                    <Button variant="contained" sx={redButtonStyle}>
                      CSS Preview
                    </Button>
                  )}
                  {(role === "Teacher" || role === "Admin") && (
                    <Button variant="contained" sx={redButtonStyle}>
                      Preview Edit
                    </Button>
                  )}
                  {LOGGED_IN && (
                    <Button component={Link} to="/calendar" variant="contained" sx={redButtonStyle}>
                      Calendar
                    </Button>
                  )}
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* MAIN CONTENT */}
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={8}>
            <Typography
              variant="h4"
              textAlign="center"
              gutterBottom
              sx={{ fontWeight: 'bold' }}
            >
              CSS/Slide Central is an application that can be used by teachers and activity sponsors
              to display information around the school.
            </Typography>
            <Typography variant="body1" textAlign="center" paragraph>
              A clock, countdown to the next period, schedule, and list of activities happening at
              the school are all available within the application.
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
