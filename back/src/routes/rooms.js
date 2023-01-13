var express = require('express');
var router = express.Router();
var {signIn} = require('../middlewares/auth');
var {
	getAllRooms, 
	displayRoomsAndChat
} = require('../controllers/roomsController')

//[BACK/04]: Une route qui retourne toutes les rooms
router.get('/', signIn, getAllRooms);

// route get dernier message, d'un chat name etc...dans lequel le participant participe
router.get('/contact', signIn, displayRoomsAndChat);

module.exports = router;