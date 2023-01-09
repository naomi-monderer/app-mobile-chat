var express = require('express');
var {signIn} = require('../middlewares/auth');
var router = express.Router();
var {
<<<<<<< HEAD
	postMessage,
	postMessageinChat, 
} = require('../controllers/messagesController')

// Une route qui poste sur le chat global BACK/09.
router.post('/', signIn, postMessage);

// Une route qui poste sur un chat spé BACK/10.
router.post('/:roomId', signIn, postMessageinChat);
=======
	deleteMessage,
} = require('../controllers/messagesController')

// Une route qui delete un message BACK/18.
router.delete('/delete/:messageId', signIn, deleteMessage);
>>>>>>> BACK/18-delete-own-message

module.exports = router;