import '../styles/styles.css';
import {React, useEffect, useState} from 'react';
import { Link } from 'react-router-dom'; 
import { Box, Grid, Button, Typography, Container } from '@mui/material';
import Logo from '../images/homePageLogo.png'
import Trump from '../images/Trump.png'
// specific details need to be changed once CSS is fixed
function SlideshowPage() {
    return (
        <>
         <link
  rel="stylesheet"
  href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap"
/>
        <link rel="stylesheet" href="styles.css"></link>

        {/* Logo Home Button*/}
        <Button
    component={Link}
    to="/"
    className="logo"
    sx={{ padding: 0, minWidth: "auto" }}
  >
    <img src={Logo} width="150" height="150" alt="Logo" />
  </Button>

        <h1 class="page-title">Slideshow </h1>
        
        <img src={Trump} width="150" height="150" alt="Logo" />
  
        



            </>
    );
}
export default SlideshowPage;