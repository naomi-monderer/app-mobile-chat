var express = require('express');
var {signIn} = require('../middlewares/auth');
var router = express.Router();
var {
	deleteMessage,
} = require('../controllers/messagesController')

// Une route qui delete un message BACK/18.
router.delete('/delete/:messageId', signIn, deleteMessage);

module.exports = router;