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
			console.log(data)
		}
	})
	
}

// permet à l'admin de modifier le rôle et le login d'un user.

const adminUpdateUser = (req, res) => {

	
	const sql = 'UPDATE  users SET login = ?, id_role = ? WHERE id = ?'
	db.query(sql, [req.body.login, req.body.id_role, req.params.id] , function(error, data){

		if(error){throw error;}
		else{res.send(data).status(204);}
		
	})

}

const authUsers =  (req, res)	 => {
	const login = req.body.login;
    const password = req.body.password;


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
	console.log('!!!!fonction connectedUser du controller!!!!');
	res.status(200).json({
		user: req.user
	})
}

module.exports = {
	getUsers,
	authUsers,
	connectedUser,
	adminUpdateUser
}
