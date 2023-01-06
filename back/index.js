const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const port = 3000
// const io = require("socket.io")(3000, {
// 	cors: {
// 		origin: ["http://localhost:3000"],
// 	}
// })

// io.on("connection", socket => {
// 	console.log(socket.id)
// })

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
app.use('/users', users);

var chat = require('./src/routes/messages');
app.use('/chat', chat);


// Start server
app.listen(port, () => {
		console.log(`Example app listening on port ${port}`)
})