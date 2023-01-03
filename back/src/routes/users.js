var express = require('express');
var router = express.Router();
var {
	getUsers, addUserToRoom, test
} = require('../controllers/usersController')

// Une route qui retourne tous les utilisateurs dans une liste contenant les champs prenom et nom.
router.get('/', getUsers);
// Une route qui permet à l'utilisateur de rejoindre une room 
router.post('/rooms/:id', addUserToRoom);
router.get('/test', test);




module.exports = router;