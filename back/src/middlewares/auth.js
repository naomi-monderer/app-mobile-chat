const jwt = require("jsonwebtoken");
const JWT_SIGN_SECRET = 'oaziehiozaaoi8756123hiauzdi29';
const db = require('../../database');
const bcrypt = require('bcrypt');
var express = require('express');
const app = express();


exports.signIn = (req, res, next) => {
 
	var signInOptions = {
		expireIn: "7d",
		algorithm:  "HS256"
	}
	const tokenToUse = req.headers;

	const token = tokenToUse.authorization.split(' ')[1]

	if(!tokenToUse.hasOwnProperty("authorization")) res.status(401).json({ message: "Authorization not found"})
		try {
			const mySecret = "mysecret";
			const decoded = jwt.verify(token, mySecret, signInOptions);

			req.user = decoded;
			
		} catch (err) {
			return res.status(401).send("Invalid Token");
		}
		return next();
};
