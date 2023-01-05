const jwt = require("jsonwebtoken");
const JWT_SIGN_SECRET = 'oaziehiozaaoi8756123hiauzdi29';
const db = require('../../database');
const bcrypt = require('bcrypt');
var express = require('express');
const app = express();


module.exports = {
    isAdmin: (req, res, next) =>{
        if(req.user.id_role == 1){
            next();
        }else{
            res.status(403).send();
        }
    }
}