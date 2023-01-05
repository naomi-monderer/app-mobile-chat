const data = {};
const db = require('../../database');
// _APPDIR
// const {getAllUsers} = require('../models/usersModel');
var express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { json } = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken')
// app.use(express.json());
//

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

// je veux récupérer le body de ma requete

const insertToRoom = (id_room, id_user) => {
	const sql = `INSERT INTO participants (id_room, id_user) VALUES (?,?)`
	db.query(sql, [id_room, id_user], function (error, data) {

		if (error) {
			throw (error)
		}
		else {
			return data
		}

	})
}
const addUserToRoom = (req, res) => {


	const verifyRoles = `SELECT role FROM  users INNER JOIN roles 
	ON roles.id = users.id_role WHERE users.id = ?`
	db.query(verifyRoles, [req.params.id], function (error, data) {

		// console.log(data[0])

		// console.log(Object.keys(data).length);
		//check si la longueur du tableau role est différent de 0 c'est qu'il y a au moins 1 role definit pour cet id 
		// not empty !!!
		if (data.length !== 0) {

			data.forEach((user) => {

			// pour accéder à data on doit rentrer dans le tableau
			// et récupérer la valeur role du user : "user"
				if (user.role !== "ban") {

					// console.log(user);

					// check if la relation entre room et user exist
					// req.auth.user_id
					//
					
					var insertUser = insertToRoom(req.body.id_room, req.params.id)

					res.status(201).send(insertUser)
				} else {
					res.send({ "message": 'Vous avez été bani de cette room' })
				}
			});
		} else {
			res.send({ "message": "L'utilisateur n'existe pas" })
		}



	})
}


module.exports = {
	getUsers, addUserToRoom
}

