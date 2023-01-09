var express = require('express');
var {signIn} = require('../middlewares/auth');
var router = express.Router();
var {
	postMessage,
	postMessageinChat, 
	deleteMessage,
	updateMessage,
    specificChat,
} = require('../controllers/messagesController')

// Une route qui poste sur le chat global BACK/09.
router.post('/', signIn, postMessage);

// Une route qui poste sur un chat spé BACK/10.
router.post('/:roomId', signIn, postMessageinChat);

// Une route qui delete un message BACK/18.
router.delete('/delete/:messageId', signIn, deleteMessage);

// Une route qui update un message BACK/17
router.post('/edit/:messageId', signIn, updateMessage);

// Une route GET tous les message d'un chat spécifique BACK/27.
router.get('/get/:roomId', signIn, specificChat);

module.exports = router;