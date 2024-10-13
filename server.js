// server.js
const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db'); // Import the MySQL connection
const cors = require('cors');


const app = express();



app.use(cors({
    origin: 'http://localhost:5173', // replace with your React app's URL
  }));
app.use(bodyParser.json()); // To parse JSON data in requests

// Route to handle form submissions
app.post('/submit-form', (req, res) => {
  const { formType, name, countryCode, phoneNumber } = req.body;

  // Simple validation (you can expand this)
  if (!name || !countryCode || !phoneNumber) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  // Insert form data into the database
  const query = 'INSERT INTO forms (formType, name, countryCode, phoneNumber) VALUES (?, ?, ?, ?)';
  db.query(query, [formType, name, countryCode, phoneNumber], (err, result) => {
    if (err) {
      console.error('Error inserting data:', err);
      return res.status(500).json({ error: 'Database error' });
    }

    res.json({ message: 'Form submitted successfully', data: result });
  });
});


// Route to fetch all submitted forms
app.get('/get-forms', (req, res) => {
  const query = 'SELECT * FROM forms';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching data:', err);
      return res.status(500).json({ error: 'Database error' });
    }

    res.json({ data: results });
  });
});

// Start the server
app.listen(5000, () => {
  console.log('Server is running on http://localhost:5000');
});
