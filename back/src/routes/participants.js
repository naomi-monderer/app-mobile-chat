var express = require('express');
var router = express.Router();
var {signIn} = require('../middlewares/auth');
var {
	getRooms, 
} = require('../controllers/participantsController')

// Une route get All users from 1 room (TICKET BACK/04-19)
router.get('/rooms-list/:userId', signIn, getRooms);

module.exports = router;