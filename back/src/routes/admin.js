const db = require('../../database')
var express = require('express');
var {isAdmin} = require('../middlewares/isAdmin');

var router = express.Router();

var {
	supressMessagesFromGreneral,

} = require('../controllers/adminController')

var {authUsers}= require('../controllers/usersController')


router.get('/supress', isAdmin.isAdmin, supressMessagesFromGreneral)