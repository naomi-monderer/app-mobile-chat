const db = require('../../database');
const bcrypt = require('bcrypt');
var express = require('express');
const jwt = require('jsonwebtoken');
const { config } = require('../../database');
const app = express();

const supressMessagesFromGreneral = (req,res) =>{
    // const id_room = req.user.id_room
    console.log('reqqqq', req.user)
    db.query(`SELECT * FROM messages WHERE id_room IS NULL`, function (error, results) {
		console.log('reqqqdferfzq', results)
        // if (results.length > 0) {
         
            
        //       res.status(200).json({
        //         message: "All the messages are now suppress",
        //       });
        // } else {
        //     res.status(200).json({
        //         message: "the room contain no messages",
        //       });
        // }
      })

    console.log("controller",req.user)
    res.status(200).send()
}

module.exports={
    supressMessagesFromGreneral,
}