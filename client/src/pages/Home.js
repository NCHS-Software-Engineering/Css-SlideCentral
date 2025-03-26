// src/pages/Home.js
import React from 'react';
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
          <Grid
            container
            spacing={2}
            alignItems="center"
            justifyContent="center"
          >
            {/* Left Side Buttons - On top in mobile */}
            <Grid item xs={12} md={4}>
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: { xs: 'repeat(auto-fit, minmax(120px, 1fr))', sm: 'repeat(4, 1fr)' },
                  gap: 1,
                  justifyContent: 'center',
                }}
              >
                <Button component={Link} to="/activities" variant="contained" sx={redButtonStyle}>
                  Enter Activity
                </Button>
                <Button variant="contained" sx={redButtonStyle}>
                  Slideshow
                </Button>
                <Button variant="contained" sx={redButtonStyle}>
                  Developers
                </Button>
                <Button variant="contained" sx={redButtonStyle}>
                  Edit Activities
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
                  gridTemplateColumns: { xs: 'repeat(auto-fit, minmax(120px, 1fr))', sm: 'repeat(4, 1fr)' },
                  gap: 1,
                  justifyContent: 'center',
                }}
              >
                <Button variant="contained" sx={redButtonStyle}>
                  Login
                </Button>
                <Button variant="contained" sx={redButtonStyle}>
                  CSS Preview
                </Button>
                <Button variant="contained" sx={redButtonStyle}>
                  Preview Edit
                </Button>
                <Button component={Link} to="/calendar" variant="contained" sx={redButtonStyle}>
                  Calendar
                </Button>
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
            <Typography
              variant="h5"
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
