import {React, useEffect, useState} from 'react';
import { Link } from 'react-router-dom'; 
import { Box, Grid, Button, Typography, Container } from '@mui/material';
import { Helmet } from "react-helmet";
import { keyframes } from '@emotion/react'
import Logo from '../images/homePageLogo.png'

function AccountPage() {
    // creates data storage for session user
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [role,setRole] = useState('');

    // retrives session user data from server.js
    useEffect(() => {
        fetch("http://localhost:8500/account/info", {
        method: "GET",
        credentials: "include", 
      })
        .then((res) => res.json())
        .then((data) => {
         setName(data.name);
         setEmail(data.email);
         setRole(data.role);
         console.log(data.role);
        })});

return(
    <>
   <Helmet>
   <title>My Account</title>
   <meta charSet="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="description" content="Access your account for CSS-SlideCentral" />
  <meta name="author" content="Isaac Liu" />
   </Helmet>
    
    
    <div
  sx={{
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    padding: "0 20px",
  }}
>
  {/* Logo Home Button*/}
  <Button
    component={Link}
    to="/"
    className="logo"
    sx={{ padding: 0, minWidth: "auto" }}
  >
    <img src={Logo} width="150" height="150" alt="CSS SlideCentral logo" />
  </Button>


    <h1 class="page-title" style={{ margin: 0}}>Your Account</h1>

</div>
    
    {/* Red Box with details about user's name, email, and current role all based on the google data the software retrived*/}
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
        Role: {role}<br />
        Email: {email}<br />
        </Typography>
</Box>

</Box>
    </>
);
}
export default AccountPage;