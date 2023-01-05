const db = require('../../database');
const bcrypt = require('bcrypt');
var express = require('express');
const jwt = require('jsonwebtoken')
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

const authUsers =  (req, res) => {
	const login = req.body.login;
	const password = req.body.password;

	db.query(`SELECT * FROM users WHERE login = '${login}'`, function (error, results) {
			if (results.length > 0) {
				bcrypt.compareSync(password, results[0].password, function(err, result) {
					if(result) {
						return res.send({ message: "Login Successful" });
					}
					else {
						return res.status(400).send({ message: "Invalid Password" });
					}
				});

				const mySecret = "mysecret";
				const token = jwt.sign({
					login:login, 
					email:results[0].email,
					id:results[0].id, 
					id_role:results[0].id_role
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

module.exports = {
	getUsers,
	authUsers,
	connectedUser
}