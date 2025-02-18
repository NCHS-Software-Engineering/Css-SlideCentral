// App.js
import React from 'react';
import { Box, Grid, Button, Typography, Container } from '@mui/material';
import { keyframes } from '@emotion/react';

// Fade-in animation for the whole page
const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

// Updated red button style for a compact look
const redButtonStyle = {
  backgroundColor: 'red',
  color: '#fff',
  padding: '6px 12px',      // Smaller padding makes the buttons less "fat"
  textTransform: 'none',    // Keeps the text as written
  transition: 'transform 0.3s, background-color 0.3s',
  whiteSpace: 'nowrap',     // Prevents the text from wrapping onto multiple lines
  '&:hover': {
    backgroundColor: '#b71c1c',
    transform: 'scale(1.05)',
  },
};

function App() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: '#f0f0f0',
        animation: `${fadeIn} 0.7s ease-in-out`,
      }}
    >
      {/* TOP BAR */}
      <Box sx={{ background: 'linear-gradient(to bottom, #777, #ddd)', p: 1 }}>
        <Container maxWidth="lg">
          <Grid container alignItems="center">
            {/* Left side buttons in one line */}
            <Grid item xs={4}>
              <Box sx={{ display: 'flex', gap: '0.5rem', flexWrap: 'nowrap' }}>
                <Button variant="contained" sx={redButtonStyle}>
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

            {/* Center: Ellipse */}
            <Grid item xs={4} container justifyContent="center">
              <Box
                sx={{
                  width: 80,
                  height: 40,
                  backgroundColor: 'black',
                  borderRadius: '50%',
                }}
              />
            </Grid>

            {/* Right side: Login on top with additional buttons below */}
            <Grid item xs={4} container justifyContent="flex-end">
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                <Button variant="contained" sx={redButtonStyle}>
                  Login
                </Button>
                <Box sx={{ mt: 1, display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                  <Button variant="contained" sx={redButtonStyle}>
                    CSS Preview
                  </Button>
                  <Button variant="contained" sx={redButtonStyle}>
                    Preview Edit
                  </Button>
                  <Button variant="contained" sx={redButtonStyle}>
                    Calendar
                  </Button>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* MAIN CONTENT */}
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Grid container spacing={2} alignItems="center">
          {/* Centered Text */}
          <Grid item xs={12} md={8}>
            <Typography
              variant="h4" // Change this variant to h2, h1, etc., to adjust text size
              textAlign="center"
              gutterBottom
              sx={{ fontWeight: 'bold' }}
            >
              CSS/Slide Central is an application that can be used by teachers and activity sponsors to display information around the school.
            </Typography>
            <Typography variant="h6" textAlign="center" paragraph>
              A clock, countdown to the next period, schedule, and list of activities happening at the school are all available within the application.
            </Typography>
            <Typography variant="h6" textAlign="center">
              To learn more, click on the buttons on the right.
            </Typography>
          </Grid>

          {/* Right side white buttons */}
          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: '#fff',
                  color: '#000',
                  '&:hover': { backgroundColor: '#f5f5f5' },
                }}
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
              >
                Tutorial
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default App;
