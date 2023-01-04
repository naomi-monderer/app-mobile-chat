var express = require('express');
var router = express.Router();
var {
	getUsers, registerUsers,
} = require('../controllers/usersController')

// Une route qui retourne tous les utilisateurs dans une liste contenant les champs prenom et nom.
router.get('/', getUsers);

// Une route qui inscrit les utilisateurs BACK/01-inscription
router.post('/inscription', registerUsers);

module.exports = router;