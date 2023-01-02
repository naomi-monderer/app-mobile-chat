const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();

// Parse request bodies as JSON
app.use(bodyParser.json());

// Connect to MySQL database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'chat'
});

connection.connect((error) => {
  if (error) {
    console.error(error);
  } else {
    console.log('MySQL connected');
  }
});

// Define routes
// app.get('/users', (req, res) => {
//   connection.query('SELECT * FROM users', (error, results) => {
//     if (error) {
//       res.status(500).send(error);
//     } else {
//       res.send(results);
//     }
//   });
// });

// app.post('/users', (req, res) => {
//   const user = req.body;
//   connection.query('INSERT INTO users SET ?', user, (error) => {
//     if (error) {
//       res.status(500).send(error);
//     } else {
//       res.send('User created');
//     }
//   });
// });

// Start server
app.listen(3000, () => {
  console.log('API server listening on port 3000');
});
