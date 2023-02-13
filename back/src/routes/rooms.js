var express = require('express');
var router = express.Router();
var {signIn} = require('../middlewares/auth');
var {
	getAllRooms, 
	displayRoomsAndChat,
	displayMainChat
} = require('../controllers/roomsController')

//[BACK/04]: Une route qui retourne toutes les rooms où l'user n'est pas
router.get('/', signIn, getAllRooms);

// route get dernier message, d'un chat name etc...dans lequel le participant participe
router.get('/contact', signIn, displayRoomsAndChat);

// route get dernier message, d'un chat name etc...dans le main chat
router.get('/generalroom', signIn, displayMainChat);

module.exports = router;