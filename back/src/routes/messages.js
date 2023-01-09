var express = require('express');
var {signIn} = require('../middlewares/auth');
var router = express.Router();
var {
    specificChat,
} = require('../controllers/messagesController')

// Une route GET tous les message d'un chat spécifique BACK/27.
router.get('/get/:roomId', signIn, specificChat);

module.exports = router;