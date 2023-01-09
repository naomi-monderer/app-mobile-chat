var express = require('express');
var router = express.Router();
var {signIn} = require('../middlewares/auth');
var {
	getAllRooms, 
} = require('../controllers/roomsController')

//[BACK/???]: Une route qui retourne toutes les rooms
router.get('/', getAllRooms);

module.exports = router;