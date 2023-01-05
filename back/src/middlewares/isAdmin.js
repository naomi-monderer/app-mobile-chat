const jwt = require("jsonwebtoken");
const JWT_SIGN_SECRET = 'oaziehiozaaoi8756123hiauzdi29';
const db = require('../../database');
const bcrypt = require('bcrypt');
var express = require('express');
const app = express();


// module.exports = {
//     isAdmin: (req, res, next) =>{
//         // if(req.user.id_role == 1){
//         //     next();
//         // }else{
//         //     res.status(403).send();
//         // }
//         try {
//             if (req.userId.role === 0) {
//                 return res.status(400).json({ message: "Access denied" });
//             }
//             next();
//         } catch (e) {
//             return res.status(500).json({ message: "An error has occured" });
//         }
//     }
// }

exports.isAdmin = (req, res, next) =>{
   
    try {
        if (req.user.id_role === 0) {
            return res.status(400).json({ message: "Access denied" });
        }
        next();
    } catch (e) {
        return res.status(500).json({ message: "An error has occured" });
    }
}
