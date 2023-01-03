const db = require('../../database');
const userModel = require('../models/usersModel');
const bodyParser = require('body-parser');
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
const addUserToRoom = (req, res) => {
	
	// let error = validationResult(req)
	// if(error){}
	// else{
		res.status(201).send('recuperé')
		// ;}

}

const test = (req, res) =>{
	// let error = validationResult(req)
	// if(error){}
	// else{
		res.status(201).send('recuperé');
	// }
	
}




module.exports = {
	getUsers, addUserToRoom, test
}

