var express = require('express');
var router = express.Router();
var { signIn } = require('../middlewares/auth');
var {
	getAllRooms,
	deleteRoomForUser,
	displayRoomsAndChat,
	displayMainChat
} = require('../controllers/roomsController')

//[BACK/04]: Une route qui retourne toutes les rooms où l'user n'est pas.
router.get('/', signIn, getAllRooms);

// [BACK/30]: Une route qui permet à l'utilisateur de se supprimer d'une route.
router.delete('/', signIn, deleteRoomForUser);

// route get dernier message, d'un chat name etc...dans lequel le participant participe
router.get('/contact', signIn, displayRoomsAndChat);

// route get dernier message, d'un chat name etc...dans le main chat
router.get('/generalroom', signIn, displayMainChat);

module.exports = router;