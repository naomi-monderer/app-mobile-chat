const db = require('../../database');
const userModel = require('../models/usersModel');
var express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken')
// const app = express();

// app.use(express.json());

const getUsers = (req, res) => {
	res.status(201).send('récupéré')
}
const addUserToRoom = (req, res) => {
	
	// let error = validationResult(req)
	// if(error){}
	// else{
		res.status(201).send('recuperé')
		// ;}

}


module.exports = {
	getUsers, addUserToRoom
}

