// Server.js
const express = require("express");
const path = require("path");
const cors = require("cors");
const app = express();
const route = express.Router();
const { google } = require('googleapis');

require('dotenv').config(); // For environment variables
// Google Auth Library for verifying tokens
//const { OAuth2Client } = require('google-auth-library');

const OAuth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URI
);

let LOGIN_VERIFIED = false; // boolean for if you are logged in


// const jwt = require('jsonwebtoken'); // Add JWT for creating tokens




route.get("/auth", (req, res) => {
  res.render("auth");
});



// Middleware setup
app.use(cors());
app.use(express.json());
const session = require("express-session");

app.use(session({
  secret: "your-secret-key",
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Set to true if using HTTPS
}));

// Static file serving for the React build (if you do a production build)
app.use(express.static(path.join(__dirname, "../client/build")));

// start server
const PORT = process.env.PORT || 8500;
app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});

//Login

/* auth endpoint */
app.get("/signin-google",  async (req, res) => {
  const code = req.query.code;

  if(code !== undefined) {
    try {
      // Exchange authorization code for tokens
      const { tokens } = await OAuth2Client.getToken(code);
      OAuth2Client.setCredentials(tokens);
  
      // Fetch user profile
      const oauth2 = google.oauth2({ auth: OAuth2Client, version: "v2" });
      const { data } = await oauth2.userinfo.get();
  
      // Store user session
      req.session.user = {
        id: data.id,
        email: data.email,
        name: data.name,
        picture: data.picture
      };
  
      console.log("User authenticated:", req.session.user);

      const LOGIN_VERIFIED = req.session.user ? true : false; // verify account
      res.json({ loginVerified: LOGIN_VERIFIED });

      res.redirect("http://localhost:3000/"); // Redirect to the frontend dashboard
    } catch (error) {
      console.error("Auth Error:", error);
      res.redirect("/login?error=auth_failed");
    }
  } else {
    const authorizeUrl = OAuth2Client.generateAuthUrl({

      access_type: "offline",
      scope: [
        "https://www.googleapis.com/auth/userinfo.profile",
        "https://www.googleapis.com/auth/userinfo.email"
      ],
      prompt: "consent"
    });
  
    res.redirect(authorizeUrl);
  }
});

/* Callback endpoint */
app.get("/auth/google/callback", async (req, res) => {
  const code = req.query.code;

  try {
    // Exchange authorization code for tokens
    const { tokens } = await OAuth2Client.getToken(code);
    OAuth2Client.setCredentials(tokens);

    // Fetch user profile
    const oauth2 = google.oauth2({ auth: OAuth2Client, version: "v2" });
    const { data } = await oauth2.userinfo.get();

    // Store user session
    req.session.user = {
      id: data.id,
      email: data.email,
      name: data.name,
      picture: data.picture
    };

    console.log("User authenticated:", req.session.user);
    res.redirect("/"); // Redirect to the frontend dashboard
  } catch (error) {
    console.error("Auth Error:", error);
    res.redirect("/login?error=auth_failed");
  }
});

// 🔹 Route: Verify Token (For frontend token-based login)
app.post("/verify-token", async (req, res) => {
  const token = req.body.token;

  try {
    const ticket = await OAuth2Client.verifyIdToken({
      idToken: token,
      audience: process.env.CLIENT_ID
    });

    const { sub, email, name, picture } = ticket.getPayload();
    req.session.user = { id: sub, email, name, picture };

    console.log("Token Verified:", req.session.user);
    res.status(200).json({ success: true, user: req.session.user });
  } catch (error) {
    console.error("Token verification failed:", error);
    res.status(401).json({ success: false, message: "Invalid token" });
  }
});

app.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/"); // Redirect to homepage after logout
  });
});