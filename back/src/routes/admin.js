var express = require('express');
var router = express.Router();
var { signIn } = require('../middlewares/auth')
var {deleteMessageFromRoom} = require('../controllers/adminController')
const {isAdmin} = require('../middlewares/isAdmin');

// route supression d'un message d'une room spécifique BACK/16
router.get('/delete/:roomId/:id', [signIn, isAdmin,], deleteMessageFromRoom);

module.exports = router;