const jwt = require("jsonwebtoken");
const db = require('../../database');
const bcrypt = require('bcrypt');
var express = require('express');
const app = express();


exports.signIn = (req, res, next) => {
	var signInOptions = {
		expiresIn: "7d",
		algorithm:  "HS256"
	}
	const tokenToUse = req.headers.token1
	const tokenRefresh = req.headers.refreshtoken;
	// console.log('auth-token', tokenToUse, tokenRefresh);
	console.log("tokenb refresh", req.headers)
	// const token = tokenToUse.authorization.split(' ')[1]
	console.log('token', req.headers.token1)
	// if(!tokenToUse.hasOwnProperty("authorization")) res.status(401).json({ message: "Authorization not found"})
		try {
			const mySecret = "mysecret";

			const decoded1 = jwt.verify(tokenToUse, mySecret);
			const decoded2 = jwt.verify(tokenRefresh, mySecret)

			req.user = decoded1;
			req.userRefresh = decoded2;

		// 	const decodedRefresh = jwt.sign({ 
		// 		message: "refresh Token info",
		// 		email: req.user.email,
		// 		login:req.user.login,
		// 		id:req.user.id.toString(),
		// 		id_role:req.user.id_role,}, mySecret, {expireIn:'1m'});
		// // let token = req.get("authorization");
		// 	req.tokenRefresh = decodedRefresh;
			console.log('rerefffff', req.user)
			console.log('yes girl <3', decoded2)
			
		} catch (err) {
			return res.status(401).send("Invalid Token");
		}
		return next();
};

// function verifToken(req, res, next) {
// 	// const token = req.user

// 	// const isValid = authUsers(req.user.email, refreshToken);
// 	console.log("veriftokn",req.user)
// 	console.log("myUser", req.body)
// 	// try {
// 	// 	const decoded = jwt.verify(token, "refreshSecret");
// 	// 	decoded.email === email;
// 	// 	req.user = decoded
// 	//    } catch (err) {
// 	// 	return res.status(401).send("Invalid Token");
// 	//    }
// 	return next();
// }

