const db = require('../../database');
var express = require('express');


// permet à l'admin de modifier le nom d'une room.
const adminUpdateRooms = (req, res) =>{


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

	
	const sql = 'UPDATE  users SET login = ? WHERE id = ?'
	db.query(sql, [req.body.login, req.params.id] , function(error, data){

		if(error){throw error;}
		else{res.send(data).status(204);}
		
	})

}

module.exports = { adminUpdateRooms, adminUpdateUser}