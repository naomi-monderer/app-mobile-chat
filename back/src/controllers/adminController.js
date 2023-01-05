const db = require('../../database');
var express = require('express');


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

	//verif login unique 
	const sql = 'UPDATE  users SET login = ? WHERE id = ?'
	db.query(sql, [req.body.login, req.params.id] , function(error, data){

		if(error){throw error;}
		else{res.send(data).status(204);}
		
	})

}

// permet à l'admin de modifier le rôle et le login d'un user.
const adminUpdateRole = (req, res) => {

	/*
	- route accessible qu'à L'ADMIN  (ok)
- vérifier que l'utilisateur est l'admin.(ok)
- vérifier que l'user qu'il veut ban est BIEN LE BON USER (check id)
- vérifier que dans la BDD il est retiré de TOUS ses groupes
- vérifier que son role est passé à 0 
- vérifier que PARCE QUE son role est passé à 0, en front, il ne peut se réinscrire dans un groupe (l'option lui est enlevé).
- vérifier qu'il ne peut plus envoyer de message dans le chat global (socket io).
	*/
	const sql = 'UPDATE users SET id_role = ? WHERE id = ?'

	db.query(sql, [req.body.id_role, req.params.id] , function(error, data){

		if(error){throw error;}
		else{res.send(data).status(204);}
		
	})

}


module.exports = { adminUpdateRoom, adminUpdateUser, adminUpdateRole}