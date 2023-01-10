const jwt = require("jsonwebtoken");
const db = require('../../database');
const bcrypt = require('bcrypt');
var express = require('express');
const { refreshToken } = require("../controllers/usersController");
const app = express();


exports.signIn = (req, res, next) => {
	// var signInOptions = {
	// 	expiresIn: "1m",
	// 	algorithm:  "HS256"
	// }
	const tokenToUse = req.headers.token1
	const tokenRefresh = req.headers.refreshtoken;
	// console.log('auth-token', tokenToUse, tokenRefresh);
	// console.log("tokenb refresh", req.headers.refreshtoken)
	// const token = tokenToUse.authorization.split(' ')[1]
	// console.log('token', req.headers)
	// if(!tokenToUse.hasOwnProperty(req.headers)){
		// res.status(401).json({ message: "Authorization not found"})
	// }
		try {
			const mySecret = "mysecret";
			const decoded1 = jwt.verify(tokenToUse, mySecret);
			req.user = decoded1;
			try{
				const decoded2 = jwt.verify(tokenRefresh, mySecret)
				req.userRefresh = decoded2;
				console.log('object');

				next();
			}catch(err){
				// return res.status(417).send("vivi")
				return  refreshToken(decoded1.id, token => {
					res.status(417).send(token)
				})
					
			}

		} catch (err) {
			return res.status(401).send(err);
		}
			
		
		// 	const decodedRefresh = jwt.sign({ 
		// 		message: "refresh Token info",
		// 		email: req.user.email,
		// 		login:req.user.login,
		// 		id:req.user.id.toString(),
		// 		id_role:req.user.id_role,}, mySecret, {expireIn:'1m'});
		// // let token = req.get("authorization");
		// 	req.tokenRefresh = decodedRefresh;
			// console.log('rerefffff', req.user)
			// console.log('yes girl <3', decoded2)
			
		// } catch (err) {
		// 	return res.status(401).send(refreshToken(decoded1.id));
		// }
		// return next();
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

