const db = require('../../database');

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

module.exports = {
	getParticipants,
}