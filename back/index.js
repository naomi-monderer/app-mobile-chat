const express = require('express');
const jwt = require("jsonwebtoken");
const bodyParser = require('body-parser');
const mysql = require('mysql');
const app = express();
const {signIn} = require("./src/middlewares/auth");
const {isAdmin} = require("./src/middlewares/isAdmin");

const cors = require('cors');
const corsOptions ={

    // allowedHeaders: ['Content-Type', 'Authorization'],
    // origin:'http://localhost:19006', 
    origin:'http://localhost',
    // origin:'http://localhost:3306',
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200,
    // headers: {
    // 'Access-Control-Allow-Methods': '*',
    // 'Access-Control-Allow-Headers': '*',
    // 'Access-Control-Allow-Credentials': 'true',
    // }
}
// const corsOptions = {
//     origin:'*', 
//     credentials:true,            //access-control-allow-credentials:true
//     optionSuccessStatus:200,
//     origin: 'http://localhost',
//     credentials: true,
//     optionsSuccessStatus: 200,
//     methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATH'],
//     allowedHeaders: ['Content-Type', 'Authorization'],
//     exposedHeaders: ['Authorization'],
//     headers: 'Access-Control-Allow-Headers, Content-Type, Authorization',
// };

// const corsOptions = {
//   origin: 'http://localhost',
//   credentials: true,
//   optionsSuccessStatus: 200,
// //   methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
//   allowedHeaders: ['Content-Type', 'Authorization'],
//   exposedHeaders: ['Authorization'],
// //   headers: 'Access-Control-Allow-Headers, Content-Type, Authorization',
// //   'Access-Control-Allow-Methods': '*',
// };

  
app.use(cors(corsOptions));

// Parse request bodies as JSON
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));

var users = require('./src/routes/users');
var admin = require('./src/routes/admin');
var participants = require('./src/routes/participants')
var chat = require('./src/routes/messages');
var rooms = require('./src/routes/rooms');

//Users route
app.use('/users', users);

//Participants route
app.use('/participants', participants);

// Verify route
app.use('/connected', signIn, users )

//Admin route
app.use('/admin', [signIn, isAdmin], admin)

//Message route
app.use('/chat', chat);

//Rooms route
app.use('/rooms', rooms);

// Start servera
app.listen(3000, () => {
	console.log('API server listening on port 3000');
});
