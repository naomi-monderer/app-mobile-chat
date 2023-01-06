const db = require('../../database');
// const bcrypt = require('bcrypt');
var express = require('express');
// const jwt = require('jsonwebtoken')
// const app = express();

// app.use(express.json());

const postMessage = (req, res) => {
	const datetime = new Date().toISOString().slice(0, 19).replace('T', ' ');
	const data = req.body;

	if(data.content) {
		const sql = `INSERT INTO messages (content, created_at, id_user, id_room) VALUES ("${data.content}", "${datetime}", ${req.user.id}, 0)`

		db.query(sql, function (err) {
			if (err) throw err;
			else res.status(200).send('message inserted');
		});
	}
	else res.send('write a message, please')
}

const postMessageinChat = (req, res) => {
	const datetime = new Date().toISOString().slice(0, 19).replace('T', ' ');
	const data = req.body;

	if(data.content) {
		if(Object.keys(req.params).length !== 0 && req.user.id_rooms.includes(req.params.roomId)) {
			const sql = `INSERT INTO messages (content, created_at, id_user, id_room) VALUES ("${data.content}", "${datetime}", ${req.user.id}, "${req.params.roomId}")`

			db.query(sql, function (err) {
				if (err) throw err;
				else res.status(200).send('message inserted');
			});
		}
		else res.status(405).send('You are not allowed to post on this chat. Please subscribe to this chat.')
	}
	else res.send('write a message, please')
}

module.exports = {
	postMessage,
	postMessageinChat,
}