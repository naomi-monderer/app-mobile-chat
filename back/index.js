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

// créer un dossier public où on y pose notre css - images pour que ça s'affiche
// app.use(express.static(path.join(__dirname, '/public')));
var users = require('./src/routes/users');
var admin = require('./src/routes/admin');

app.use('/users', users);
app.use('/admin', [signIn,isAdmin],admin)

// Start server
app.listen(port, () => {
		console.log(`Example app listening on port ${port}`)
})