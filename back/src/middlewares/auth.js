const jwt = require("jsonwebtoken");
const db = require('../../database');
const bcrypt = require('bcrypt');
var express = require('express');
const { refreshToken } = require("../controllers/usersController");
// const checkDate = require("./checkDate")
const app = express();


exports.signIn = (req, res, next) => {
	const tokenToUse = req.headers.token1
	const tokenRefresh = req.headers.refreshtoken;
	try {
		const mySecret = "mysecret";
		const decoded1 = jwt.verify(tokenToUse, mySecret);
		req.user = decoded1;
		console.log("REFRESH token",decoded1)
			
			// if(!this.checkDate(tokenToUse)){
			// 	console.log('hey!');
			// 	return false;
			// }else{
				console.log('ça passe');
				try{

				const decoded2 = jwt.verify(tokenRefresh, mySecret)
					req.userRefresh = decoded2;
				next();

			}catch(err){
				return  refreshToken(decoded1.id, token => {
					res.status(417).send(token)
				})
			}
			// }

			
		} catch (err) {
			return res.status(401).send(err);
		}
};

exports.checkDate = tokenToUse => {

    if (tokenToUse.type == 'authtoken') {
        return tokenToUse.iat + 604800 >= getCurrentTimestamp();
        // return tokenToUse.iat + 90 >= getCurrentTimestamp();
    } else if (tokenToUse.type == 'token') {
        // return tokenToUse.iat + 900 >= getCurrentTimestamp();
        return tokenToUse.iat + 30 >= getCurrentTimestamp();
    }
};



