const db = require('../../database');
const bcrypt = require('bcrypt');
var express = require('express');
const jwt = require('jsonwebtoken');
const { config } = require('../../database');
const app = express();



const supressMessagesFromGreneral = (req,res) =>{
    db.query('SELECT * FROM messages WHERE `id_room` = 0', function (error, results) {
        if (results.length > 1) {

            db.query('DELETE FROM messages WHERE `id_room` = 0')
            res.status(200).send("All messages from GENERAL are know deleted ")

            db.query('DELETE FROM messages WHERE `id_room` IS NULL')
              res.status(200).send("All messages from GENERAL are now deleted ")

        } 
        else {
            res.status(400).json({
                message: "the room contain no more messages",
            });
        }
    })
}


const supressOneMessage = (req, res) => {
    const id_message = req.params.id

    db.query(`SELECT * FROM messages WHERE id = '${id_message}'`, function (error, results){

        if(results.length > 0){
            db.query(`DELETE FROM messages WHERE id = '${id_message}'`)
            res.status(200).send("the message number: " + id_message +  " is now supressed")
        }
        else {
            res.status(400).json({
                message: "the message does not exist",
              });
        }
    })
}



// permet à l'admin de modifier le nom d'une room.
const adminUpdateRoom = (req, res) =>{
	// verif avec les middle ware
	const sql = 'UPDATE rooms SET name = ? WHERE id = ?'
	db.query(sql, [req.body.name, req.params.id],function(error){
		if (error){throw error;}
		else res.status(200).send("Room's name updated !");
	})
}

// permet à l'admin de modifier le rôle et le login d'un user.
const adminUpdateUser = (req, res) => {
	const sql = 'UPDATE  users SET login = ? WHERE id = ?'
	db.query(sql, [req.body.login, req.params.id] , function(error, data){

	if(error){
		throw error;
	}else{
		res.send(data).status(204);
	}

	});
}

// permet à l'admin de modifier le rôle et le login d'un user.
const adminUpdateRole = (req, res) => {
	const sql = 'UPDATE users SET id_role = ? WHERE id = ?'

	db.query(sql, [req.body.id_role, req.params.id] , function(error, data){

		if(error){throw error;}
		else{res.send(data).status(204);}
		
	})
}


module.exports = { 
	adminUpdateRoom, 
	adminUpdateUser, 
	adminUpdateRole, 
	supressMessagesFromGreneral,
  supressOneMessage
}

