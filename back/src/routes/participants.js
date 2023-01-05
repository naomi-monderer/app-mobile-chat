var express = require('express');
var router = express.Router();
var {signIn} = require('../middlewares/auth');
var {
	getParticipants, 
	deleteUser,
} = require('../controllers/participantsController')

// Une route get All users from 1 room (TICKET BACK/04)
router.get('/:roomId', signIn, getParticipants);

// BACK/06 route qui retourne tous les utilisateurs dans une liste contenant les champs prenom et nom.
router.delete('/:roomId/:userId', signIn ,deleteUser);

module.exports = router;