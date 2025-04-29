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
   
    <img src={Logo} width="150" height="150" alt="Logo"  style={{ display: 'block', margin: '0 auto' }}/>
    
  </Button>

        <h1 class="page-title">Slideshow </h1>
        
        <img src={Trump} width="1152" height="648" style={{ display: 'block', margin: '0 auto' }} />
  
        <div class="slideshow-container">
        <div class="slide-content">
        <div class="slide-text">

          <h1 class="slide-header">Activity Title</h1>
          <p><strong>Sponsor:</strong> Michael Romanov</p>
          <p><strong>Date:</strong> 4/28/25</p>
          <p><strong>Time:</strong> 3:10 pm </p>
          <p><strong>Desc:</strong> Michael Romanov is cool asf</p>

          <div class="slide-image"> {/* image*/} </div>
          </div>
          </div>
        </div>



            </>
    );
}
export default SlideshowPage;