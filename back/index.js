const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const app = express();
const jwt = require('jsonwebtoken');
const {signIn} = require("./src/middlewares/auth");
const {isAdmin} = require("./src/middlewares/isAdmin");

// Parse request bodies as JSON
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));

//Route accessible a tous
var users = require('./src/routes/users');
var admin = require('./src/routes/admin');
var participants = require('./src/routes/participants')

app.use('/users', users);
// app.use('/admin', admin);

app.use('/participants', participants);

// Verify route
app.use('/connected', signIn, users )

//Admin route
app.use('/admin', [signIn,isAdmin],admin)


// Start servera
app.listen(3000, () => {
	console.log('API server listening on port 3000');
});
