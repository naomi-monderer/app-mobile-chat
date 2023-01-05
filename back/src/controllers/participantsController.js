const db = require('../../database');
// const bcrypt = require('bcrypt');
var express = require('express');
// const jwt = require('jsonwebtoken')
// const app = express();

// app.use(express.json());

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
	deleteUser,
}