const jwt = require("jsonwebtoken");
const db = require('../../database');
const bcrypt = require('bcrypt');
var express = require('express');
const { refreshToken } = require("../controllers/usersController");

const app = express();


exports.signIn = (req, res, next) => {
	// console.log('req', req.headers)
	//je reçois deux tokens du controllers, l'un durant 30 jrs de validité l'autre 1minute
	
	const authToken = req.headers.token// ICI

	const refreshtoken = req.headers.refreshtoken;

	

	try {

		const mySecret = "mysecret";
		const decoded = jwt.verify(authToken, mySecret);
		try{
			
			//verification avec la date actuelle, si l'expiration 
			const payload = jwt.verify(refreshtoken, mySecret)
			var now = new Date().getTime() / 1000;
			if (now > payload.exp) { 
				/* expired */ 
				//le token est disponible ds le scope grace au callback ds refreshToken du usersController 
				return refreshToken(decoded.id, token => {
					res.status(417).send(token)
				});
			}
			req.user = payload;
			next();
			
		}catch(err){
			return  refreshToken(decoded.id, token => {
				res.status(417).send(token)
			})
		}
	
			
		} catch (err) {
			
			return res.status(401).json({message: err});
		}
};