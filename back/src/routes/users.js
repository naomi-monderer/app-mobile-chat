const db = require('../../database')
var express = require('express');

var router = express.Router();

var {
	getUsers, updateUser
} = require('../controllers/usersController')


// Une route qui retourne tous les utilisateurs dans une liste contenant les champs prenom et nom.
router.get('/', getUsers);

//Une route qui permet de mettre a jour les informations des utilisateurs BACL/08-update-user
router.post('/update',signIn, updateUser);

module.exports = router;