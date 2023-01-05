var express = require('express');
var router = express.Router();
var {
	getUsers,
} = require('../controllers/usersController')

// Une route qui retourne tous les utilisateurs dans une liste contenant les champs prenom et nom.
router.get('/', getUsers);

module.exports = router;