var express = require('express');
var router = express.Router();
var {signIn} = require('../middlewares/auth');
var {
	getUsers, 
	authUsers, 
	connectedUser

} = require('../controllers/usersController')

// Une route qui retourne tous les utilisateurs dans une liste contenant les champs prenom et nom (TICKET BACK/03)
router.get('/', getUsers);

// route [BACK/02 verif token and secure route for connected users]
router.get('/signin', signIn, connectedUser);

//route [BACK/02 connexion de l'user et attribution du token]
router.post('/auth',  authUsers)

module.exports = router;