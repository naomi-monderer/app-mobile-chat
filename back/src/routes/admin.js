var express = require('express');
var router = express.Router();
var { signIn } = require('../middlewares/auth')
var { adminUpdateRoom, adminUpdateUser, adminUpdateRole, supressMessagesFromGreneral,supressOneMessage, getAllMessagesFromGeneral} = require('../controllers/adminController')
const {isAdmin} = require('../middlewares/isAdmin');



// Une route qui  update le nom d'une room BACK/???
router.patch('/rooms/:id/update', [signIn,isAdmin] ,adminUpdateRoom);

// Une route qui update le login d'un user BACK/???
router.patch('/users/:id/update', [signIn,isAdmin] ,adminUpdateUser);

// Une route qui update le role d'un user BACK/???
router.patch('/users/:id/update/role', [signIn,isAdmin] ,adminUpdateRole);

// route supression de tous les messages BACK/???
router.get('/supress', [signIn, isAdmin], supressMessagesFromGreneral)

// route supression d'un message BACK/???
router.get('/supressmessage/:id',[signIn, isAdmin], supressOneMessage)

// voir tous les messages du chat general BACK/26
router.get('/messages', [signIn, isAdmin], getAllMessagesFromGeneral)


module.exports = router;