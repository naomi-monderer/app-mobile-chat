const db = require('../../database');
// const bcrypt = require('bcrypt');
var express = require('express');
// const app = express();

const getUsers = (req, res) => {
	const sql = 'SELECT `login` FROM users'
	db.query(sql, function(error, data){
		if (error) {
			throw error;
		}
		else {
			res.send(data);
		}
	})
}


const updateUser = (req, res) => {
	const { login, email, password, confPassword } = req.body;
	try {
		if (login != null){
			//Si le login est remplis
			 db.query("SELECT login FROM users WHERE id = '"+ req.params.id +"'", (err, response) => {
				if(response.length > 0) {
					//Si le login est déjà pris en base de donnée return erreur
					return res.status(401).json({'error': 'Login not avaible'});
				} else {
					if (password === confPassword) {
						//Si la confirmation du mot de passe est valide on met a jours le login de l'utilisateurs
						res.status(200).json({
						 	status: true,
						 	message: 'Login updated'
						});
						db.query("UPDATE users set login='"+login+"' WHERE id = '"+req.user.id+"'  "), (err, response) => {
							if(err) {

							res.status(500).json({
								status: false,
								message: 'There was a problem with the query.'
							});						
							}
						}
					} else {
						res.status(401).json({'error': 'the password do not match'});
					}
				}
			})
		} else if (email != null){
			//Si le email est remplis
			db.query("SELECT email FROM users WHERE id = '"+ req.params.id +"'", (err, response) => {
			   if(response.length > 0) {
					//Si le email est déjà pris en base de donnée return erreur
				   return res.status(401).json({'error': 'email not avaible'});
			   } else {
				   if (password === confPassword) {
						//Si la confirmation du mot de passe est valide on met a jours le login de l'utilisateurs
					   res.status(200).json({
							status: true,
							message: 'Email updated'
					   });
					   db.query("UPDATE users set email='"+email+"' WHERE id = '"+req.user.id+"'  "), (err, response) => {
						   if(err) {

						   res.status(500).json({
							   status: false,
							   message: 'There was a problem with the query.'
						   });						
						   }
					   }
				   } else {
					   res.status(401).json({'error': 'the password do not match'});
				   }
			   }
		   })
	   } else if (password != null){
			//Si le password est remplis
		db.query("SELECT password FROM users WHERE id = '"+ req.params.id +"'", (err, response) => {
		   if(response.length > 0) {
			   return res.status(401).json({'error': 'password not avaible'});
		   } else {
			   if (password === confPassword) {
						//Si la confirmation du mot de passe est valide on met a jours le login de l'utilisateurs et on hash
				   const salt =  bcrypt.genSalt()
				   const hash =   bcrypt.hash(password, salt);
				   res.status(200).json({
						status: true,
						message: 'Password updated'
				   });
				   db.query("UPDATE users set password='"+hash+"' WHERE id = '"+req.user.id+"'  "), (err, response) => {
					   if(err) {

					   res.status(500).json({
						   status: false,
						   message: 'There was a problem with the query.'
					   });						
					   }
				   }
			   } else {
				   res.status(401).json({'error': 'the password do not match'});
			   }
		   }
	   })
   		} else{
			   //Si l'utilisateurs ne remplis aucun champs return erreur
			   res.status(401).json({'error': 'Empty field'});
		}

	} catch (error) {
		console.log(error)
	}
}

module.exports = {
	getUsers,
	updateUser
}