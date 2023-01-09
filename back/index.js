const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const port = 3000

const app = express();

// Parse request bodies as JSON
app.use(bodyParser.json());
// app.use(express.json());
// get data from form-data -- build-in middleware
app.use(express.urlencoded({ extended: false }));


// Define routes

var chat = require('./src/routes/messages');
app.use('/chat', chat);
// créer un dossier public où on y pose notre css - images pour que ça s'affiche
// app.use(express.static(path.join(__dirname, '/public')));
var users = require('./src/routes/users');
app.use('/users', users);


// Start server
app.listen(port, () => {
		console.log(`Example app listening on port ${port}`)
})