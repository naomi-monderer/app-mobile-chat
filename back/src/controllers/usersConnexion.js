const db = require('../../database');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

//analyser le corps et utuliser body-parser por rendre disponible les données
app.use(bodyParser.urlencoded({ extended: false }));
// simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to application." });
  });
  
app.post('/login', (req, res) => {
    // Traitement de la demande de connexion ici
    const login = req.body.login;
    const password = req.body.password;
    const email = req.body.email;

    if (login && password) {
		
		connection.query('SELECT * FROM users WHERE login = ? AND password = ?', [login, password], function(error, results, fields) {
		
			if (error) throw error;
		
			if (results.length > 0) {
				// Authenticate the user
			
				// Redirect to home page
				// response.redirect('/home');
			} else {
				res.send('Incorrect Username and/or Password!');
			}			
			res.end();
		});
	} else {
		res.send('Please enter Username and Password!');
		res.end();
	}
  });