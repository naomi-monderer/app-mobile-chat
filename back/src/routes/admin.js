const db = require('../../database')
var express = require('express');
var {isAdmin} = require('../middlewares/isAdmin');
var {signIn} = require('../middlewares/auth');

var router = express.Router();

var {
	supressMessagesFromGreneral,

} = require('../controllers/adminController')



router.get('/supress', [signIn, isAdmin], supressMessagesFromGreneral)

module.exports = router;