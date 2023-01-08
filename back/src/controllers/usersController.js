const db = require('../../database');
const bcrypt = require('bcrypt');
var express = require('express');
const jwt = require('jsonwebtoken')
// const app = express();

const registerUsers = async (req, res) => {
	const { login, password, email } = req.body;
	// Champs envoyer dans la requête

	try {
		//Verification champs renseigné
		if (login == null || password == null || email == null) {
			return res.status(400).json({ 'error': 'missing params' });
		} else {
			//Vérification du login disponnible en base de donnée
			db.query("SELECT * FROM users WHERE login = '" + login + "'", async (err, response) => {

				if (response.length > 0) {
					//Si le login existe déjà en base de donnée on return l'erreur
					return res.status(400).json({ 'error': 'Login not valid' });
				}

				//Vérification si le mail existe en base de donnée
				db.query("SELECT * FROM users WHERE email = '" + email + "' ", async (err, response) => {

					if (response.length > 0) {
						//Si l'email existe déjà en base de donnée on return l'erreur
						return res.status(400).json({ 'error': 'email alreaddy used' });
					}

					// Hash password
					const salt = await bcrypt.genSalt()
					const hash = await bcrypt.hash(password, salt);

					// Insert user into database
					db.query(
						`INSERT INTO users (login, password, email, id_role) VALUES ("${login}", "${hash}", "${email}", 1)`, (err, response) => {
							if (err) {
								res.status(500).json({
									status: false,
									message: 'There was a problem with the query.'
								});

							} else {

								// send the JWT to the client
								res.status(200).json({
									status: true,
									message: 'Inscription valider'
								});
							}
						});
				});
			})

		}
	} catch (error) {
		console.log(error);
		res.status(500).send(error);
	}
}


const authUsers = (req, res) => {
	const login = req.body.login;
	const password = req.body.password;

	db.query(`SELECT * FROM users WHERE login = '${login}'`, function (error, results) {

		if (results.length > 0) {
			bcrypt.compareSync(password, results[0].password, function (err, result) {
				if (result) {
					return res.send({ message: "Login Successful" });
				}
				else {
					return res.status(400).send({ message: "Invalid Password" });
				}
			});

			const mySecret = "mysecret";
			const token = jwt.sign({
				login: login,
				email: results[0].email,
				id: results[0].id,
				id_role: results[0].id_role,
			}, mySecret);

			res.status(200).json({
				status: true,
				token: token
			});
		} else {
			console.log('not working')
		}
	})

}

const connectedUser = (req, res) => {

	res.status(200).json({
		user: req.user
	})
}

const getUsers = (req, res) => {
	const sql = 'SELECT `login` FROM users'
	db.query(sql, function (error, data) {
		if (error) {
			throw error;
		}
		else {
			res.send(data);
		}
	})
}

const getUserDetails = (req, res) => {
	const sql = `SELECT users.login, users.email, GROUP_CONCAT(rooms.name) AS rooms_name FROM users, rooms WHERE users.id = ${req.params.userId}`
	db.query(sql, function (error, data) {
		if (error) {
			throw error;
		}
		else {
			res.send(data);
		}
	})
}

module.exports = {
	registerUsers,
	authUsers,
	connectedUser,
	getUsers,
	getUserDetails
}
