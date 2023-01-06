var express = require('express');
var router = express.Router();
var {signIn} = require('../middlewares/auth');
var {
	getAllRooms, 
} = require('../controllers/roomsController')

router.get('/', getAllRooms);

module.exports = router;