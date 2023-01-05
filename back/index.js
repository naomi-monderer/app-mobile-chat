const express = require('express');
const jwt = require("jsonwebtoken");
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
app.use('/users', users);

// Verify route
app.get('/connected', (req, res) => {
	// Get token value to the json body
	const token = req.body.token;
  
	// If the token is present
	if(token){
  
		// Verify the token using jwt.verify method
		const decode = jwt.verify(token, 'secret');
  
		//  Return response with decode data
		res.json({
			login: true,
			data: decode
		});
	}else{
  
		// Return response with error
		res.json({
			login: false,
			data: 'error'
		});
	}
  })


// Start server
app.listen(port, () => {
		console.log(`Example app listening on port ${port}`)
})