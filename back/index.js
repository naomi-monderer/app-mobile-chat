const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const app = express();
const jwt = require('jsonwebtoken');

const {signIn} = require("./src/middlewares/auth");
const {isAdmin} = require("./src/middlewares/isAdmin")

// Parse request bodies as JSON
app.use(bodyParser.json());
// app.use(express.json());
app.use(express.urlencoded({ extended: false }));


var users = require('./src/routes/users');
var admin = require('./src/routes/admin');

app.use('/users', users);
// app.use('/admin', admin);

app.use('/admin', [signIn,isAdmin], admin)

// Verify route
app.use('/connected', signIn, users )

// Start server
app.listen(3000, () => {
  console.log('API server listening on port 3000');
});
