const db = require('../../database');
const bcrypt = require('bcrypt');
var express = require('express');
const jwt = require('jsonwebtoken')
const app = express();

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
    const email = req.body.email;
	// const token 
	// const query = ;
	// const params = [login, password];
console.log(login)
	if (login && password){
		db.query(`SELECT * FROM users WHERE login = '${login}' AND password = '${password}'`, function (error, results) {
			// if (error) throw error;
		  
			if (results.length > 0) {
			  // Les données de connexion sont valides
			//   for(var count = 0; count < results.length; count++) {
				console.log("query auth ok")
				const token = jwt.sign({email:email}, 'your_jwt_secret')
				console.log(token)
				
			//   }
			
			  res.status(200).json({
				status: true,
				token: token
			  });
			} else {
			  // Les données de connexion ne sont pas valides
			  console.log('not working')
			}
		  })
	}
}

// const authentication = await authUsers()

module.exports = {
	getUsers,
	authUsers
}