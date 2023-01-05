var express = require('express');
var {signIn} = require('../middlewares/auth');

var router = express.Router();

var { 
	registerUsers, 
	authUsers, 
	connectedUser,
	getUsers,
	getUserDetails

} = require('../controllers/usersController')


// Une route qui inscrit les utilisateurs BACK/01-inscription
router.post('/inscription', registerUsers);

// route [BACK/02 verif token and secure route for connected users]
router.get('/signin', signIn, connectedUser);

//route [BACK/02 connexion de l'user et attribution du token]
router.post('/auth',  authUsers)

// route BACK/03 retourne tous les utilisateurs dans une liste contenant les champs prenom et nom.
router.get('/', getUsers);

//route [BACK/07] get the details from 1 user
router.get('/:userId', signIn ,getUserDetails);

module.exports = router;