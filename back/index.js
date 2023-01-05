const express = require('express');
const jwt = require("jsonwebtoken");
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();

// Parse request bodies as JSON
app.use(bodyParser.json());


// Define routes

// créer un dossier public où on y pose notre css - images pour que ça s'affiche
// app.use(express.static(path.join(__dirname, '/public')));
var users = require('./src/routes/users');
app.use('/users', users);

// Verify route
app.get('/connected', signIn, users)


// Start server
app.listen(3000, () => {
  console.log('API server listening on port 3000');
});
