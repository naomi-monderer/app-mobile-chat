const db = require('../../database')
var express = require('express');
var {signIn} = require('../middlewares/auth');

var router = express.Router();

var { 
	registerUsers, 
	authUsers, 
	connectedUser,
	addUserToRoom,
	getUsers,
	getUserDetails,
	updateUser
} = require('../controllers/usersController')


// Une route qui inscrit les utilisateurs BACK/01-inscription
router.post('/inscription', registerUsers);

// route [BACK/02 verif token and secure route for connected users]
router.get('/signin', signIn, connectedUser);

//route [BACK/02 connexion de l'user et attribution du token]
router.post('/auth',  authUsers)

// route BACK/03 retourne tous les utilisateurs dans une liste contenant les champs prenom et nom.
router.get('/', getUsers);

// BACK/05
router.post('/:id/room', addUserToRoom);

//route [BACK/07] get the details from 1 user
router.get('/:userId', signIn ,getUserDetails);

//Une route qui permet de mettre a jour les informations des utilisateurs BACK/08-update-user
router.post('/update',signIn, updateUser);

module.exports = router;