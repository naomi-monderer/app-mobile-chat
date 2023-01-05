const db = require('../../database');
// const bcrypt = require('bcrypt');
var express = require('express');
// const jwt = require('jsonwebtoken')
// const app = express();

// app.use(express.json());

const getRooms = (req, res) => {
	// récupérer et afficher toutes les rooms dispo à l'user s'il y est inscrit sinon rien afficher
	const sql = `SELECT rooms.id, name FROM rooms INNER JOIN participants ON id_room = rooms.id WHERE id_user = ${req.params.userId}`
	db.query(sql, function(error, data){
		if (error) {
			throw error;
		}
		else {
			res.send(data);
		}
	})
}

module.exports = {
	getRooms,
}