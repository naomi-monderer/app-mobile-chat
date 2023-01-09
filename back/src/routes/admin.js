var express = require('express');
var router = express.Router();
var { signIn } = require('../middlewares/auth')
var { adminUpdateRoom, adminUpdateUser, adminUpdateRole, supressMessagesFromGreneral,supressOneMessage, getAllMessagesFromGeneral} = require('../controllers/adminController')
const {isAdmin} = require('../middlewares/isAdmin');

//[BACK/22-admin-update-rooms]: Une route qui  update le nom d'une room 
router.patch('/rooms/:id/update', [signIn,isAdmin] ,adminUpdateRoom);

//[BACK/14-admin-update-users]: Une route qui update le login d'un user. (branche obsolète. A jour sur BACK/12-admin-update-roles)
router.patch('/users/:id/update', [signIn,isAdmin] ,adminUpdateUser);

//[BACK/12-admin-update-roles]: Une route qui update le rôle d'un user 
router.patch('/users/:id/update/role', [signIn,isAdmin] ,adminUpdateRole);

//[BACK/16-route-admin-supress-message]: Une route qui supprime tous les messages. 
router.get('/supress', [signIn, isAdmin], supressMessagesFromGreneral)

//[BACK/22-route-admin-supress-OneMessage]: Une route qui supprime un message.
router.get('/supressmessage/:id',[signIn, isAdmin], supressOneMessage)

//[BACK/26-route-admin-get-all-messages]: Une route qui récupère tous les messages du chat general 
router.get('/messages', [signIn, isAdmin], getAllMessagesFromGeneral)


module.exports = router;