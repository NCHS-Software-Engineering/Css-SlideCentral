import '../styles/styles.css';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; 
import { Button } from '@mui/material';
import Logo from '../images/homePageLogo.png';
// specific details need to be changed once CSS is fixed
function DevelopersPage() {
    return(
        <>
        <Button
        component={Link}
        to="/"
        className="logo"
        sx={{ padding: 0, minWidth: "auto" }}
      >
        <img src={Logo} width="150" height="150" alt="Logo" style={{ display: 'block', margin: '0 auto' }} />
      </Button>

    <div class="container">
    <h1 class="page-title">Meet the Developers</h1>
    <div class="grid">
      
      <div class="card">
        <div class="name">Isaac Liu</div>
        <div class="year">Class of 2026</div>
        <div class="bio">
        Project manager and QA lead. Coordinated team tasks and led the interface design and React integration for CSS/SlideCentral. Developed the general structure and vison of the app, Login interface and domains, Slideshow, Tutorial, and FAQ. Currently a senior at NCHS.
        </div>
      </div>

      <div class="card">
        <div class="name">Arnav Vedavyas</div>
        <div class="year">Class of 2025</div>
        <div class="bio">
        Frontend developer and primary supervisor. Developed the computer and mobile versions of the software and the activity entry form. Currently attending University of Illinois (Urbana-Champaign) as a [something] major.
        </div>
      </div>

      <div class="card">
       
        <div class="name">Jinan Parves</div>
        <div class="year">Class of 2026</div>
        <div class="bio">
          Worked on full-stack development. Managed API connections and ensured data flow between frontend and backend.
        </div>
      </div>

      <div class="card">
        
        <div class="name">Michael Antipov</div>
        <div class="year">Class of 2026</div>
        <div class="bio">
        Backend engineer who built and optimized the Node.js + MySQL backend.
        </div>
      </div>

    </div>
  </div>
  </>
    );
}

export default DevelopersPage;