const db = require('../../database');
// const bcrypt = require('bcrypt');
var express = require('express');

const createParticipation = () => {

    return  Promise ((resolve, reject) =>{

        const sql = `INSERT INTO participants (id_room, id_user) VALUES (2,1)`
        db.query(sql, function(error, data){
            if (error) {
                return reject(error);
            }
            else {
                return resolve(data);
            }
        })
    })
}


const test = () => {

    return  Promise ((resolve, reject) =>{

        const sql = `lalala`
        db.query(sql, function(error, data){
            if (error) {
                return reject(error);
            }
            else {
                return resolve(data);
            }
        })
        console.log(sql);
    })
}



module.exports = { createParticipation, test}