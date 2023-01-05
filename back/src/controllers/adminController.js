const db = require('../../database');
var express = require('express');


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

module.exports = { adminUpdateRooms }