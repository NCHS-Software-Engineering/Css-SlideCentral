// Server.js
const express = require("express");
const path = require("path");
const cors = require("cors");
const app = express();
const route = express.Router();
const { google } = require('googleapis');

require('dotenv').config(); // For environment variables

// creates new Auth Client
const OAuth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URI
);

// Middleware setup
app.use(cors());
app.use(express.json());
const session = require("express-session");

// Session initialization
app.use(session({
  secret: "your-secret-key",
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Set to true if using HTTPS
}));

// Static file serving for the React build (if you do a production build)
app.use(express.static(path.join(__dirname, "../client/build")));

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));

// start server
const PORT = process.env.PORT || 8500; // NEVER 3000!!!
app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});

//Login

/* auth endpoint */

// renders google sign in page
route.get("/auth", (req, res) => {
  res.render("auth");
}); 

// google sign in requirements
app.get("/signin-google",  async (req, res) => {
  const code = req.query.code;
  let role = "";
  if(code !== undefined) {
    try {
      // Exchange authorization code for tokens
      const { tokens } = await OAuth2Client.getToken(code);
      OAuth2Client.setCredentials(tokens);
  
      // Fetch user profile
      const oauth2 = google.oauth2({ auth: OAuth2Client, version: "v2" });
      const { data } = await oauth2.userinfo.get();

      // DOMAINS

      if(data.email.includes("isliu@stu.naperville203.org")){ // All 4 developers are Admins; Admins must be in the Admin List (coming soon)
        role = "Admin";
      }
      else if(data.email.includes("@stu.naperville203.org")){ // All D203 students have @stu.naperville203.org
        role = "Student";
      }
      else if(data.email.includes("@naperville203.org")){ // All D203 Teachers/Admins have @naperville203.org
        role = "Teacher";
      }

      // Store user session
      req.session.user = {
        id: data.id,
        email: data.email,
        name: data.name,
        picture: data.picture,
        role: role,
      };
  
      console.log("User authenticated:", req.session.user);
      
      
      res.redirect("http://localhost:3000/?loggedIn=true"); // Redirect to the home page

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

// route to check if user is logged in
app.get("/auth/status", (req, res) => {
  const isLoggedIn = !!req.session.user;
  res.json({ loginVerified: isLoggedIn, user: req.session.user });
});

// route to retrieve user's required data
app.get("/account/info", (req, res) => {
  const {name, email, role} = req.session.user;
  res.json({ name, email, role});
});

// route to log out of session
app.get("/logout", (req, res) => {
  req.session.destroy(() => { // destroy user's session
    console.log("User has logged out");
    res.redirect("http://localhost:3000/"); // Redirect to homepage after logout
  });
});