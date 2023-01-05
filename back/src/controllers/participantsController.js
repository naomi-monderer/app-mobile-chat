const db = require('../../database');
// const bcrypt = require('bcrypt');
var express = require('express');
// const jwt = require('jsonwebtoken')
// const app = express();

// app.use(express.json());

const getParticipants = (req, res) => {
	// récupérer du front lorsque sur une chatroom et click sur (view les utilisateurs) ++ potentiellement en back get tous les id des groupes et les mettre en front en caché ???

	if(req.user.id === req.params.roomId) {
		const sql = `SELECT login FROM users INNER JOIN participants ON users.id = id_user WHERE id_room = ${req.params.roomId}`
		db.query(sql, function(error, data){
			if (error) {
				throw error;
			}
			else {
				res.send(data);
			}
		})
	}
	else {
		res.send("You have no access to this room.");
	}
}

const deleteUser = (req, res) => {
	// récupérer et afficher toutes les rooms dispo à l'user s'il y est inscrit sinon rien afficher

	if(req.user.id === req.params.userId) {
		const sql = `DELETE FROM participants WHERE id_room = ${req.params.roomId} AND id_user = ${req.params.userId}`
		db.query(sql, function(error, data){
			if (error) {
				throw error;
			}
			else {
				res.send(data);
			}
		})
	}
	else {
		res.send('You cannot delete another user from the room.')
	}
}

module.exports = {
	getParticipants,
	deleteUser,
}