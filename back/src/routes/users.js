var express = require('express');
const { verifyToken } = require('../middlewares/auth');
var router = express.Router();
var { getUsers, addUserToRoom } = require('../controllers/usersController')
// var usersController = require('../controllers/usersController')

// Une route qui retourne tous les utilisateurs dans une liste contenant les champs prenom et nom.
router.get('/', getUsers);

// Une route qui permet à l'utilisateur de rejoindre une room 
router.post('/:id/room', verifyToken, addUserToRoom);






module.exports = router;