var express = require('express');
var router = express.Router();
var { 
    adminUpdateRoom, 
    adminUpdateUser, 
    adminUpdateRole, 
    supressMessagesFromGreneral,
    supressOneMessage, 
    getAllMessagesFromGeneral,
    addNewRoom
} = require('../controllers/adminController')


// Une route qui  update le nom d'une room BACK/???
router.patch('/rooms/:id/update' ,adminUpdateRoom);

// Une route qui update le login d'un user BACK/???
router.patch('/users/:id/update' ,adminUpdateUser);

// Une route qui update le role d'un user BACK/???
router.patch('/users/:id/update/role' ,adminUpdateRole);

// route supression de tous les messages BACK/???
router.get('/supress', supressMessagesFromGreneral)

// route supression d'un message BACK/???
router.get('/supressmessage/:id', supressOneMessage)

// voir tous les messages du chat general BACK/26
router.get('/messages', getAllMessagesFromGeneral)

// route créer une room BACK/28
router.post('/add-room', addNewRoom)

module.exports = router;