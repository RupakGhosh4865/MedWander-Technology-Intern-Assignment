// db.js
const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', // your MySQL username
  password: '1qaz0plm', // your MySQL password
  database: 'forms_db', // your database name
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to the MySQL database');
});

module.exports = db;
