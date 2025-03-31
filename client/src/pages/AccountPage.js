import {React, useEffect, useState} from 'react';
import { Link } from 'react-router-dom'; 
import { Box, Grid, Button, Typography, Container } from '@mui/material';

import { keyframes } from '@emotion/react'
import Logo from '../images/homePageLogo.png'

function AccountPage() {
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    useEffect(() => {
        fetch("http://localhost:8500/account/info", {
        method: "GET",
        credentials: "include", 
      })
        .then((res) => res.json())
        .then((data) => {
         setName(data.name);
         setEmail(data.email);
        })});
return(
    <>
    <div
  sx={{
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    padding: "0 20px",
  }}
>
  {/* Left: Logo Button */}
  <Button
    component={Link}
    to="/"
    className="logo"
    sx={{ padding: 0, minWidth: "auto" }}
  >
    <img src={Logo} width="150" height="150" alt="Logo" />
  </Button>

  {/* Center: Title */}
    <h1 class="page-title" style={{ margin: 0}}>Your Account</h1>

</div>
    
    <Box
  sx={{
    width: '800px',
    height: '600px',
    backgroundColor: '#b71c1c',
    border: '1px solid #ccc',
    borderRadius: '10px',
    padding: '16px',
    margin: 'auto', // centers it horizontally
    mt: 16, // margin-top for vertical spacing
    display: 'flex',
  }}
>
<Box sx={{ color: 'white', 
     width: '99%',           
     height: '94%',
    padding: '16px', 
    display: 'flex',                
    justifyContent: 'center',   
    textAlign: 'center', }}>
        <Typography fontSize='36px' > 
        Name: {name}<br />
        Role: Administrator<br />
        Email: {email}<br />
        </Typography>
</Box>

</Box>
    </>
);
}
export default AccountPage;