const db = require('../../database');
const io = require('../../index');
var express = require('express');


const postMessage = (req, res) => {
	const datetime = new Date().toISOString().slice(0, 19).replace('T', ' ');
	const data = req.body;
	

	if (data.content && req.user.id_role !== 0) {
		const sql = `INSERT INTO messages (content, created_at, id_user, id_room) VALUES ("${data.content}", "${datetime}", ${req.user.id}, 0)`

		db.query(sql, function (err) {
			if (err) throw err;
			else res.status(200).send('message inserted');
		});
	}
	else res.send('write a message, please')
}

const postMessageinChat = (req, res) => {
	const datetime = new Date().toISOString().replace('T', ' ').toLocaleString({
		timeZone: "Europe/Paris",
	}).slice(0, 19);
	const data = req.body;
	if (data.content && req.user.id_role !== 0) {
		if (Object.keys(req.params).length !== 0 && req.user.id_rooms.includes(req.params.roomId)) {
			const sql = `INSERT INTO messages (content, created_at, id_user, id_room) VALUES ("${data.content}", "${datetime}", ${req.user.id}, "${req.params.roomId}")`
			db.query(sql, function (err) {
				if (err) throw err;
				
				console.log("data:", req.user.login);
				const message = {
					content: data.content,
					created_at: "2023-01-12T17:32:11.000Z",
					// updated_at: "2023-01-12T17:32:11.000Z",
					// id: data.id,
					login: req.user.login
				};
		
				console.log('allo', req.params.roomId)
				io.to(parseInt(req.params.roomId)).emit('newMessage', message)
				// console.log(4);

				res.status(200).send('message inserted');
			});
		}
		else res.status(405).send('You are not allowed to post on this chat. Please subscribe to this chat.')
	}
	else res.send('write a message, please')
}

const deleteMessage = (req, res) => {
	const sql = `SELECT id_user FROM messages WHERE id = ${req.params.messageId}`

	db.query(sql, function (err, data) {
		if (err) throw err;
		else {
			if (req.user.id === data[0].id_user.toString()) {

				const sql = `DELETE FROM messages WHERE id = ${req.params.messageId} AND id_user = ${req.user.id}`

				db.query(sql, function (err) {
					if (err) throw err;
					else res.status(200).send("Message deleted.")
				});
			}
			else {
				res.status(400).send("You cannot delete this message.")
			}
		}
	});

}

const updateMessage = (req, res) => {
	const datas = req.body;
	const sql = `SELECT id_user FROM messages WHERE id = ${req.params.messageId}`
	db.query(sql, function (err, data) {
		if (err) throw err;
		else {
			if (req.user.id === data[0].id_user.toString()) {
				if (datas.content) {
					const sql = `UPDATE messages SET content="${datas.content}" WHERE id = ${req.params.messageId}`

					db.query(sql, function (err) {
						if (err) throw err;
						else res.status(200).send('Message edited.');
					});
				}
				else res.status(200).send('Please enter a message.');
			}
			else {
				res.status(400).send("You cannot edit this message.")
			}
		}
	});
}

const specificChat = (req, res) => {
	if (req.user.id_rooms.includes(req.params.roomId)) {
		const sql = `SELECT messages.id as id_message, content, created_at, login FROM messages INNER JOIN users ON messages.id_user = users.id WHERE id_room = ${req.params.roomId} ORDER BY created_at ASC`
		db.query(sql, function (err, data) {
			if (err) throw err;
			else res.send(data);
			console.log(" function specific chat");
		})
	} else res.status(400).send('You do not have access to the room');
}



const getMessagesinGlobalChat = (req, res) => {
	const sql = `SELECT content, created_at, users.login FROM messages INNER JOIN users ON id_user = users.id WHERE id_room = 0 ORDER BY created_at ASC`

	db.query(sql, function (err, data) {
		if (err) throw err;
		else res.status(200).send(data);
		console.log('getMessagesinGlobalChat');
	});
}

module.exports = {
	postMessage,
	postMessageinChat,
	deleteMessage,
	updateMessage,
	specificChat,
	getMessagesinGlobalChat
}