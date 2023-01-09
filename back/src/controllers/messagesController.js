const db = require('../../database');
const bcrypt = require('bcrypt');
var express = require('express');
const jwt = require('jsonwebtoken')
// const app = express();

const deleteMessage = (req, res) => {
	const sql = `SELECT id_user FROM messages WHERE id = ${req.params.messageId}`
	db.query(sql, function (err, data) {
        if (err) throw err;
        else {
			console.log(data[0].id_user.toString())
			if(req.user.id === data[0].id_user.toString()) {
				console.log('test')
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

module.exports = {
	deleteMessage
}