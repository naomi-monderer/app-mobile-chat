var mysql = require('mysql');
const express = require('express');
const app = express();

var connection = mysql.createConnection({
    host: 'localhost',
	user: 'root',
	password: 'root',
	database: 'chat',
    port    : '3000',
});

connection.connect(function(error){
    if(error) {
        throw error;
    }
    else {
        console.log('database connected');
    }
});

module.exports = connection