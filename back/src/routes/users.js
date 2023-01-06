const db = require('../../database')
var express = require('express');
var {signIn} = require('../middlewares/auth');

var router = express.Router();

var {
	getUsers, registerUsers, authUsers, connectedUser

} = require('../controllers/usersController')


// Une route qui retourne tous les utilisateurs dans une liste contenant les champs prenom et nom.
router.get('/', getUsers);

// Une route qui inscrit les utilisateurs BACK/01-inscription
router.post('/inscription', registerUsers);

// route [BACK/02 verif token and secure route for connected users]
router.get('/signin', signIn, connectedUser);

//route [BACK/02 connexion de l'user et attribution du token]
router.post('/auth',  authUsers)

module.exports = router;