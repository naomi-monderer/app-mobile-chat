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

module.exports = { getUsers }