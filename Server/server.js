// Server.js
const express = require("express");
const path = require("path");
const cors = require("cors");
const mysql = require("mysql2"); // Import the mysql2 package
const app = express();

// Middleware setup
app.use(cors());
app.use(express.json());

// Static file serving for the React build (if you do a production build)
app.use(express.static(path.join(__dirname, "../client/build")));

// Set up MySQL connection
const connection = mysql.createConnection({
  host: 'localhost', // Change this to your MySQL host
  user: 'root', // Change this to your MySQL username
  password: 'bigBOY123!', // Change this to your MySQL password
  database: 'activitiesDB' // Change this to your MySQL database name
});

// Connect to MySQL
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

// API route to get events from MySQL database
app.get('/api/events', (req, res) => {
  const query = 'SELECT * FROM activities';  

  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching activities:', err);
      res.status(500).send('Error fetching activities');
      return;
    }
    res.json(results); // Send the events as JSON
  });
});

// Start server
const PORT = process.env.PORT || 3002;  
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});


app.get('/Learn more about widgets', (req, res) => {
  window.open('/widgetPage.js', '_blank');
});
