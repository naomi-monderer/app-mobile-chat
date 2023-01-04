const db = require('../../database');
// const bcrypt = require('bcrypt');
var express = require('express');
// const jwt = require('jsonwebtoken')
// const app = express();

// app.use(express.json());

const getUsers = (req, res) => {
	const sql = 'SELECT `login` FROM users'
	db.query(sql, function(error, data){
		if (error) {
			throw error;
		}
		else {
			res.send(data);
		}
	})
}

const updateUser = async (req, res) => {
	/**
	 * TO DO:
	 * Recupère les values de l'utilisateurs a l'aide du TOKEN JWT pour remplacer les fakes data en attendant 
	 * Les req.body de base seront les informations pres remplis de base de l'utilisateurs pour UPDATE uniquement les champs modifier par celui-ci
	 * 
	 */
	const { login, email, password, confPassword } = req.body;
	try {
	
		if (login == null || email == null){
		//Check si les champs sont remplis
		return res.status(400).json({'error': 'missing params'});
	} else {

		db.query("SELECT * FROM users WHERE login = '"+ login +"'", async (err, response) => {
			console.log(response)
			if(response.length > 0) {
				//Si le login existe déjà en base de donnée on return l'erreur
				return res.status(400).json({'error': 'Login not valid'});
			}

			//Vérification si le mail existe en base de donnée
			db.query("SELECT * FROM users WHERE email = '" + email +"' ", async (err, response) => {

				if (response.length > 0) {
					//Si l'email existe déjà en base de donnée on return l'erreur
					return res.status(400).json({'error': 'email alreaddy used'});
				}

				console.log(password)
				console.log(confPassword)
				if (password === confPassword){
					console.log('les password sont les memes')
				} else {
					console.log('pas les memes')
				}
			});
		});
		// db.query(
		// 	`UPDATE users SET login = "${login}", email = "${email}" WHERE id = "${id}"`,
		// 	async (error, results) => {
		// 	  if (error) throw error;
		// 	  await console.log('first')
		// 	  res.status(200);
		// 	  console.log(`Changed ${results.changedRows} row(s)`);
		// 	}
		//   );
		}
	} catch (error) {
		console.log(error)
		// res.status(500).send(error);
	}
}

module.exports = {
	getUsers, updateUser,
}