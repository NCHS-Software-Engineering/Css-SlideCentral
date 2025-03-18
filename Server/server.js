// Server.js
const express = require("express");
const path = require("path");
const cors = require("cors");
const app = express();
const route = express.Router();

// Google Auth Library for verifying tokens
const { OAuth2Client } = require('google-auth-library');

const oAuth2 = new OAuth2Client(CLIENT_ID);

const jwt = require('jsonwebtoken'); // Add JWT for creating tokens
require('dotenv').config(); // For environment variables

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;

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

