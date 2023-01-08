const db = require('../../database');
const bcrypt = require('bcrypt');
var express = require('express');
const jwt = require('jsonwebtoken');
const { config } = require('../../database');
const app = express();


// type enumeration const à ckecker pour la gestion des constante.

const supressMessagesFromGreneral = (req, res) => {

	db.query('SELECT * FROM messages WHERE `id_room` IS NULL', function (error, results) {

		if (results.length > 1) {
			db.query('DELETE FROM messages WHERE `id_room` IS NULL')
			res.status(200).send("All messages from GENERAL are know deleted ")
		}
		else {
			res.status(200).json({
				message: "the room contain no more messages",
			});
		}
	})

}


// permet à l'admin de modifier le nom d'une room.
const adminUpdateRoom = (req, res) => {

	const sql = 'UPDATE rooms SET name = ? WHERE id = ?'
	db.query(sql, [req.body.name, req.params.id], function (error, data) {

		if (error) { throw error; }
		else {

			res.send(data);

		}
	})
}

// permet à l'admin de modifier le rôle et le login d'un user.
const adminUpdateUser = (req, res) => {

	// verifier si l'id tapé dans l'url existe.
	const verifyId = 'SELECT id FROM users WHERE id = ?'
	db.query(verifyId, [req.params.id], function (error, data) {

		if(data.length == 0) {

			res.status(404).send({ message: 'The id '+ [req.params.id] +' does not exist. Please choose another one.'})
		}
		else{

			// met à jour le login 
			const sql = 'UPDATE  users SET login = ? WHERE id = ?'
			db.query(sql, [req.body.login, req.params.id], function (error, data) {
				try{
		
					// const keys = Object.keys(data)
					// console.log('keys ', keys)
					if (error) {
						// si la requete rencontre une erreur passe au catch 
						throw error;
					} 
					else {

					res.status(200).send({ message: 'The login has been updated.'});
					}
				} catch (err) {
					// je recupère le contenu de ma variable error grâce au throw
					// dans le paramètre de ma fonction catch 
					res.status(500).send({ message: 'This login is already in use'})
				}
		
			});
		}
	})


	

}

// permet à l'admin de modifier le rôle et le login d'un user.
const adminUpdateRole = (req, res) => {

	// verifier si l'id tapé dans l'url existe.
	const verifyId = 'SELECT id FROM users WHERE id = ?'
	db.query(verifyId, [req.params.id], function (error, data) {

		if(data.length == 0) {

			res.status(404).send({ message: 'The id '+ [req.params.id] +' does not exist. Please choose another one.'})
		}
		else
		{
			// peut-être ajouter une verif sur l'id du role pour être sur que le role choisi existe. securité maximmum
			const sql = 'UPDATE users SET id_role = ? WHERE id = ?'
			db.query(sql, [req.body.id_role, req.params.id], function (error, data){

				if (error){throw error }
				else{res.send(data).status(204);}
			})
		}	
	})
}	



module.exports = { adminUpdateRoom, adminUpdateUser, adminUpdateRole, supressMessagesFromGreneral }
