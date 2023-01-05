var express = require('express');
var router = express.Router();
var {signIn} = require('../middlewares/auth');
var {
	getParticipants, 
} = require('../controllers/participantsController')

// Une route get All users from 1 room (TICKET BACK/04)
router.get('/:roomId', signIn, getParticipants);

module.exports = router;