// Server.js
const express = require("express");
const path = require("path");
const cors = require("cors");
const app = express();
const route = express.Router();

require('dotenv').config(); // For environment variables
// Google Auth Library for verifying tokens
const { OAuth2Client } = require('google-auth-library');

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const oAuth2 = new OAuth2Client(CLIENT_ID);


// const jwt = require('jsonwebtoken'); // Add JWT for creating tokens




route.get("/", (req, res) => {
  res.render("auth");
});



// Middleware setup
app.use(cors());
app.use(express.json());

// Static file serving for the React build (if you do a production build)
app.use(express.static(path.join(__dirname, "../client/build")));

// start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});

//Login

/* auth endpoint */
app.get('/auth/google', (req, res) => {
  // Generate the url that will be used for authorization
  const authorizeUrl = OAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: [
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email'
    ],
    prompt: 'consent'
  });

  res.redirect(authorizeUrl);
});

/* Callback endpoint */
app.get('/auth/google/callback', async (req, res) => {
  // Get the authorization code from the query parameters
  const code = req.query.code;

  try {
    // Exchange the code for access and refresh tokens
    const { tokens } = await OAuth2Client.getToken(code);
    OAuth2Client.setCredentials(tokens);

    // Use the tokens to get user information
    const oauth2 = google.oauth2({
      auth: OAuth2Client,
      version: 'v2'
    });
    const { data } = await oauth2.userinfo.get();

    // Create a session for the user
    req.session.user = {
      id: data.id,
      email: data.email,
      name: data.name,
      picture: data.picture
    };

    // Redirect to your application's dashboard
    res.redirect('/dashboard');
  } catch (error) {
    console.error('Error during authentication:', error);
    res.redirect('/login?error=auth_failed');
  }
});

