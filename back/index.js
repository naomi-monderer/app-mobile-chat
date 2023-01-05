const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const app = express();
const jwt = require('jsonwebtoken');

const {signIn} = require("./src/middlewares/auth");

// Parse request bodies as JSON
app.use(bodyParser.json());
// app.use(express.json());
app.use(express.urlencoded({ extended: false }));


var users = require('./src/routes/users');

app.use('/users', users);


// Verify route
app.use('/connected', signIn, users )

// Start server
app.listen(3000, () => {
  console.log('API server listening on port 3000');
});
