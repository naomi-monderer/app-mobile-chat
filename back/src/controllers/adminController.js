const db = require('../../database');
const bcrypt = require('bcrypt');
var express = require('express');
const jwt = require('jsonwebtoken');
const { config } = require('../../database');
const app = express();

const supressMessagesFromGreneral = (req,res) =>{
    
}

module.exports={
    supressMessagesFromGreneral,
}