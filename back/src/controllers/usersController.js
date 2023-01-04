const db = require('../../database');
// const bcrypt = require('bcrypt');
var express = require('express');
// const jwt = require('jsonwebtoken')
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

const authUsers = (req, res) => {
	const login = req.body.login;
    const password = req.body.password;
    // const email = req.body.email;
	const query = `SELECT * FROM users WHERE login = '${login}' AND password = '${password}'`;
	// const params = [login, password];

	if (login && password){
		db.query(query, (error, results) => {
			if (error) throw error;
		  
			if (results.length > 0) {
			  // Les données de connexion sont valides
			  res.send(results)
			} else {
			  // Les données de connexion ne sont pas valides
			}
		  })
	}
}

module.exports = {
	getUsers,
	authUsers
}