const { response } = require('express');
const db = require('../../database');
// const bcrypt = require('bcrypt');
var express = require('express');
// const jwt = require('jsonwebtoken')
// const app = express();

// app.use(express.json());



const specificChat = (req, res) => {
    
    if(req.user.id_rooms.includes(req.params.roomId)){

        const sql = `SELECT content, created_at, login FROM messages INNER JOIN users ON messages.id_user = users.id WHERE id_room = ${req.params.roomId}`

        db.query(sql, function (err, data){
            if (err) throw err;

            res.send(data);
        })
    } else {
        res.status(400).send('You do not have access to the room');
    }
}

module.exports = {
    specificChat
}