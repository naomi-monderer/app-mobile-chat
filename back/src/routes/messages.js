var express = require('express');
var {signIn} = require('../middlewares/auth');
var router = express.Router();
var {
	postMessage,
	postMessageinChat, 
	deleteMessage,
	updateMessage,
    getMessagesinGlobalChat
} = require('../controllers/messagesController')

// Une route qui poste sur le chat global BACK/09.
router.post('/', signIn, postMessage);

// Une route qui poste sur un chat spé BACK/10.
router.post('/:roomId', signIn, postMessageinChat);

// Une route qui delete un message BACK/18.
router.delete('/delete/:messageId', signIn, deleteMessage);

// Une route qui update un message BACK/17
router.post('/edit/:messageId', signIn, updateMessage);

// [BACK/26 correction to the ticket] Une route qui get tous les messages du chat global
router.get('/', signIn, getMessagesinGlobalChat);

module.exports = router;