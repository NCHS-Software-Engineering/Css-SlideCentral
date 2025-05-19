import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Grid, Button, Typography, Container, Paper } from '@mui/material';
import Logo from '../images/homePageLogo.png';

const developers = [
  { name: "Arnav Vedavyas", gradYear: 2025 },
  { name: "Isaac Liu", gradYear: 2026 },
  { name: "Jinan Parves", gradYear: 2026 },
  { name: "Michael Antipov", gradYear: 2026 }
];

function DevelopersPage() {
  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          width: "100%",
          padding: "0 20px",
          gap: "230px",
        }}
      >
        {/* Logo Home Button */}
        <Button
          component={Link}
          to="/"
          className="logo"
          sx={{ padding: 0, minWidth: "auto" }}
        >
          <img src={Logo} width="150" height="150" alt="Logo" />
        </Button>
        <h1 className="page-title" style={{ margin: 0 }}>Meet the developers</h1>
      </div>

      <Container maxWidth="md" sx={{ mt: 8 }}>
        <Grid container spacing={4} justifyContent="center">
          {developers.map((dev, idx) => (
            <Grid item xs={12} sm={6} md={3} key={idx}>
              <Paper elevation={4} sx={{ p: 3, textAlign: 'center', backgroundColor: '#b71c1c', color: 'white', borderRadius: 2 }}>
                <Typography variant="h6">{dev.name}</Typography>
                <Typography variant="subtitle1">Class of {dev.gradYear}</Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );


}

export default DevelopersPage;