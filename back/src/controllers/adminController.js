const db = require('../../database');
const bcrypt = require('bcrypt');
var express = require('express');
const jwt = require('jsonwebtoken');
const { config } = require('../../database');
const app = express();

const supressMessagesFromGreneral = (req,res) =>{
   
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
const adminUpdateRoom = (req, res) =>{


	// verif avec les middle ware
	const sql = 'UPDATE rooms SET name = ? WHERE id = ?'
	db.query(sql, [req.body.name, req.params.id],function(error,data){

		if (error){throw error;}
		else {

            res.send(data);
            console.log('ok')
        }
	})
}

// permet à l'admin de modifier le rôle et le login d'un user.
const adminUpdateUser = (req, res) => {

	// res.send('ok').status(200)
	// const login = req.body;
	// console.log(login)

	//verif login unique 
	
	// if(login == null){

	// 	return res.status(400).json({'error': 'missing params'});
	// }else{ 
		const verifyLogin = `SELECT login FROM users WHERE login = ?`
		db.query(verifyLogin, [req.params.login], (error, logins) =>{

			console.log(logins)
			res.send(logins)

				// logins.forEach((login) => {

				// 	// console.log(login)
				// 	if(!login){

				// 		console.log('This login is already in use')
				// 	}
				// 	else
				// 	{
						
				// 	}
				});
				// console.log(req.user.login);
				// res.send(login)
				// console.log(login.length)
			// if(login.length == user.req.login ){

			// 	return res.status(400).json({'error': 'this login is already in use'});
			// }
			// const sql = 'UPDATE  users SET login = ? WHERE id = ?'
			// db.query(sql, [req.body.login, req.params.id] , function(error, data){

			// if(error){
			// 	throw error;
			// }else{
			// 	res.send(data).status(204);
			// }
		
			// });


		// });

	// }

	

}

// permet à l'admin de modifier le rôle et le login d'un user.
const adminUpdateRole = (req, res) => {

	const sql = 'UPDATE users SET id_role = ? WHERE id = ?'

	db.query(sql, [req.body.id_role, req.params.id] , function(error, data){

		if(error){throw error;}
		else{res.send(data).status(204);}
		
	})

}


module.exports = { adminUpdateRoom, adminUpdateUser, adminUpdateRole, supressMessagesFromGreneral}
