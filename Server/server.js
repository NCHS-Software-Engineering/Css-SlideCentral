// server.js
const express = require("express");
const path = require("path");
const cors = require("cors");
const mysql = require("mysql2");
const app = express();

// Middleware setup
app.use(cors());
app.use(express.json());

// Static file serving for the React build (if you do a production build)
app.use(express.static(path.join(__dirname, "../client/build")));

// MySQL connection setup
const db = mysql.createConnection({
  host: "localhost",
  user: "",       // Replace with your MySQL username, important that you do this
  password: "",   // Replace with your MySQL password, important that you do this
  database: "activitiesDB"
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
    return;
  }
  console.log("Connected to MySQL database");
});

// API endpoint for adding an activity
app.post("/api/addActivity", (req, res) => {
  const {
    activityType,
    startDate,
    endDate,
    activityName,
    activityDesc,
    calendarDayOfWeek,
    calendarFrequency,
    calendarTimeOfDay,
    image
  } = req.body;

  // For image, we store the file name as a placeholder.
  const imagePath = image ? image.name || "" : "";

  const sql = `INSERT INTO activities 
    (activityType, startDate, endDate, activityName, activityDesc, calendarDayOfWeek, calendarFrequency, calendarTimeOfDay, imagePath) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    
  const values = [
    activityType,
    startDate,
    endDate,
    activityName,
    activityDesc,
    calendarDayOfWeek,
    calendarFrequency,
    calendarTimeOfDay,
    imagePath
  ];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error inserting activity:", err);
      return res.status(500).send("Error inserting activity");
    }
    res.status(200).send("Activity added successfully");
  });
});

// API endpoint to fetch events
app.get("/api/events", (req, res) => {
  const sql = "SELECT * FROM activities"; // Ensure your table is named 'activities'
  
  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error fetching events:", err);
      return res.status(500).json({ error: "Database query failed" });
    }
    res.json(results);
  });
});


// Note: The following endpoint using window.open is not applicable in a Node environment.
// You may want to update or remove it.
app.get('/Learn more about widgets', (req, res) => {
  res.send("This endpoint needs to be updated for proper widget functionality.");
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
