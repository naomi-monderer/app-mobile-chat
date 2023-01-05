const jwt = require("jsonwebtoken");
const JWT_SIGN_SECRET = 'oaziehiozaaoi8756123hiauzdi29';
const db = require('../../database');
const bcrypt = require('bcrypt');
var express = require('express');
const app = express();
// import * as fs from 'fs';



// exports.singnIn = (req, res, next) => {
exports.signIn = (req, res, next) => {


// var privateKEY  = require('/back/src/middlewares/private.key', 'utf8');
// var publicKEY  = require('/back/src/middlewares/public.key', 'utf8');

var signInOptions = {
  expireIn: "7d",
  algorithm:  "HS256"
}
    // const token =
    //   req.body.token || req.query.token || req.headers["x-access-token"];
  const tokenToUse = req.headers;
  // const token = tokenToUse.split(' ')[1];
  console.log("token du middelware", tokenToUse)
    
  if(!tokenToUse.hasOwnProperty("authorization")) res.status(401).json({ message: "Authorization not found"})
  
  // if (!token) {
    //   return res.status(403).send("A token is required for authentication");
    // }
    try {
      const mySecret = "mysecret";
      console.log("tffvrerfzfzghhgh",req.body)
      const decoded = jwt.verify(token, mySecret, signInOptions);
      

    // jwt.verify(token, secret, function(err, decoded) {
    //   if (err) {
    //     // the token is invalid
    //   } else {
    //     res.json({
    //             login: true,
    //             data: decoded
    //         });
    //   }
    // });
      req.user = decoded;
      console.log('authToken',  decoded)
      // res.json({
      //           login: true,
      //           data: req.body
      //       });
    } catch (err) {
      return res.status(401).send("Invalid Token");
    }
    return next();



  // console.log('token', token)
  // // If the token is present
  // if(token){
    
  //     // Verify the token using jwt.verify method
  //     // const JWT_SIGN_SECRET = 'oaziehiozaaoi8756123hiauzdi29';
  //     // const decode = jwt.verify(token, JWT_SIGN_SECRET);
    

  //     //  Return response with decode data
  //     res.json({
  //         login: true,
  //         data: decode
  //     });
  // }else{

  //     // Return response with error
  //     res.json({
  //         login: false,
  //         data: 'error'
  //     });
  // }

    // return next();


  };
  
  // module.exports = signIn;