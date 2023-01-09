const db = require('../../database');
const bcrypt = require('bcrypt');
var express = require('express');
const jwt = require('jsonwebtoken');
const { config } = require('../../database');
const app = express();

const deleteMessageFromRoom = (req, res) => {
    const id_message = req.params.id
    const id_room = req.params.roomId;

    db.query(`SELECT * FROM messages WHERE id = '${id_message}' AND id_room = '${id_room}'`, function (error, results){

        if(results.length > 0){
            db.query(`DELETE FROM messages WHERE id = '${id_message}'`)
            res.status(200).send("the message number: " + id_message +  " is now supressed")
        }
        else {
            res.status(400).json({
                message: "the message does not exist",
            });
        }
    })
}


module.exports = { 
    deleteMessageFromRoom
}
