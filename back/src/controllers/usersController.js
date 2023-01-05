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


module.exports = {
	getUsers, adminUpdateUser
}