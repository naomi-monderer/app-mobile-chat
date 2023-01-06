const db = require('../../database');
const bcrypt = require('bcrypt');
var express = require('express');
const jwt = require('jsonwebtoken');
const { config } = require('../../database');
const app = express();

const supressMessagesFromGreneral = (req,res) =>{
   
    db.query('SELECT * FROM messages WHERE `id_room` IS NULL', function (error, results) {

        if (results.length > 1) {
            db.query('DELETE FROM messages WHERE `id_room` IS NULL')
              res.status(200).send("All messages from GENERAL are know deleted ")
        } 
        else {
            res.status(200).json({
                message: "the room contain no more messages",
              });
        }
      })

}

module.exports={
    supressMessagesFromGreneral,
}