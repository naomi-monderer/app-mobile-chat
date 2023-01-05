const db = require('../../database');
const bcrypt = require('bcrypt');
var express = require('express');
const jwt = require('jsonwebtoken');
const {signIn} = require("../middlewares/auth");
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
	// const token = req.body.token;
	console.log(password)

		db.query(`SELECT * FROM users WHERE login = '${login}'`, function (error, results) {
			console.log('resultssss',typeof(results[0]))
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
				// const token = jwt.sign({email:email, login:login, password:password}, mySecret);
				const token = jwt.sign({login:login, password:password}, mySecret);
			
			
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
const test = (req, res) => {
	console.log('!!!!fonction test du controller!!!!');
	res.status(200).json({
		user: req.user
	})
}

module.exports = {
	getUsers,
	authUsers,
	test
}