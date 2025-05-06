// server.js
require('dotenv').config();          // load .env

const express = require("express");
const path    = require("path");
const cors    = require("cors");
const mysql   = require("mysql2");
const session = require("express-session");
const { google } = require('googleapis');

const app   = express();
const route = express.Router();

// Google OAuth2 client
const OAuth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URI
);

// Middleware
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));
app.use(express.json());
app.use(session({
  secret: "your-secret-key",
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

// Serve React build
app.use(express.static(path.join(__dirname, "../client/build")));

// MySQL connection
const db = mysql.createConnection({
  host:     process.env.DB_HOST,
  port:     parseInt(process.env.DB_PORT, 10) || 3306,
  user:     process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});
db.connect(err => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
    process.exit(1);
  }
  console.log("Connected to MySQL database");
});

// Helper: ensure authenticated
function requireAuth(req, res, next) {
  if (!req.session.user) return res.status(401).send("Not logged in");
  next();
}

// --- Create Activity ---
app.post("/api/addActivity", requireAuth, (req, res) => {
  const {
    activityType,
    activityDate,
    slideshowStartDate,
    slideshowEndDate,
    activityName,
    activityDesc,
    calendarDayOfWeek,
    calendarFrequency,
    calendarTimeOfDay,
    image
  } = req.body;

  const imagePath = image?.name || "";
  const userId    = req.session.user.id;

  const sql = `
    INSERT INTO activities (
      userId,
      activityType,
      activityDate,
      slideshowStartDate,
      slideshowEndDate,
      activityName,
      activityDesc,
      calendarDayOfWeek,
      calendarFrequency,
      calendarTimeOfDay,
      imagePath
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;
  const values = [
    userId,
    activityType,
    activityDate,
    slideshowStartDate,
    slideshowEndDate,
    activityName,
    activityDesc,
    calendarDayOfWeek,
    calendarFrequency,
    calendarTimeOfDay,
    imagePath
  ];

  db.query(sql, values, err => {
    if (err) {
      console.error("Error inserting activity:", err);
      return res.status(500).send("Error inserting activity");
    }
    res.status(200).send("Activity added successfully");
  });
});

// --- Read / list this user's activities ---
app.get("/api/events", requireAuth, (req, res) => {
  const userId = req.session.user.id;
  db.query(
    "SELECT * FROM activities WHERE userId = ?",
    [userId],
    (err, results) => {
      if (err) {
        console.error("Error fetching events:", err);
        return res.status(500).json({ error: "Database query failed" });
      }
      res.json(results);
    }
  );
});

// --- Update an existing activity ---
app.put('/api/updateActivity/:id', requireAuth, (req, res) => {
  const id = req.params.id;
  const userId = req.session.user.id;
  const {
    activityType,
    activityDate,
    slideshowStartDate,
    slideshowEndDate,
    activityName,
    activityDesc,
    calendarDayOfWeek,
    calendarFrequency,
    calendarTimeOfDay
  } = req.body;

  const sql = `
    UPDATE activities
       SET activityType       = ?,
           activityDate       = ?,
           slideshowStartDate = ?,
           slideshowEndDate   = ?,
           activityName       = ?,
           activityDesc       = ?,
           calendarDayOfWeek  = ?,
           calendarFrequency  = ?,
           calendarTimeOfDay  = ?
     WHERE id = ? AND userId = ?
  `;
  const vals = [
    activityType,
    activityDate,
    slideshowStartDate,
    slideshowEndDate,
    activityName,
    activityDesc,
    calendarDayOfWeek,
    calendarFrequency,
    calendarTimeOfDay,
    id,
    userId
  ];

  db.query(sql, vals, err => {
    if (err) {
      console.error('Error updating activity:', err);
      return res.status(500).send('Error updating activity');
    }
    res.sendStatus(200);
  });
});

// --- Delete an activity ---
app.delete('/api/deleteActivity/:id', requireAuth, (req, res) => {
  const userId = req.session.user.id;
  db.query(
    'DELETE FROM activities WHERE id = ? AND userId = ?',
    [req.params.id, userId],
    err => {
      if (err) {
        console.error('Error deleting activity:', err);
        return res.status(500).send('Error deleting activity');
      }
      res.sendStatus(200);
    }
  );
});

// (Optional) placeholder endpoint
app.get('/Learn more about widgets', (req, res) => {
  res.send("This endpoint needs to be updated for proper widget functionality.");
});

// --- OAuth / session routes ---
route.get("/auth", (req, res) => res.render("auth"));

app.get("/signin-google", async (req, res) => {
  const code = req.query.code;
  if (!code) {
    const url = OAuth2Client.generateAuthUrl({
      access_type: "offline",
      scope: [
        "https://www.googleapis.com/auth/userinfo.profile",
        "https://www.googleapis.com/auth/userinfo.email"
      ],
      prompt: "consent"
    });
    return res.redirect(url);
  }

  try {
    const { tokens } = await OAuth2Client.getToken(code);
    OAuth2Client.setCredentials(tokens);
    const oauth2 = google.oauth2({ auth: OAuth2Client, version: "v2" });
    const { data } = await oauth2.userinfo.get();

    // Role logic (without michael.k.antipov)
    const admins = [
      "isliu@stu.naperville203.org",
      "jsparves@stu.naperville203.org",
      "arvedavyas@stu.naperville203.org",
      "mkantipov@stu.naperville203.org"
    ];
    let role = admins.includes(data.email)
      ? "Admin"
      : data.email.includes("@stu.naperville203.org")
        ? "Student"
        : data.email.includes("@naperville203.org")
          ? "Teacher"
          : "Guest";

    req.session.user = {
      id:      data.id,
      email:   data.email,
      name:    data.name,
      picture: data.picture,
      role
    };

    console.log("User authenticated:", req.session.user);
    res.redirect("http://localhost:3000/?loggedIn=true");
  } catch (err) {
    console.error("Auth Error:", err);
    res.redirect("/login?error=auth_failed");
  }
});

app.get("/auth/status", (req, res) => {
  res.json({ loginVerified: !!req.session.user, user: req.session.user });
});

app.get("/account/info", (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ error: "User not logged in" });
  }
  const { name, email, role } = req.session.user;
  res.json({ name, email, role });
});

app.get("/logout", (req, res) => {
  req.session.destroy(() => {
    console.log("User has logged out");
    res.redirect("http://localhost:3000/");
  });
});

// --- Start server ---
const PORT = process.env.PORT || 8500;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});