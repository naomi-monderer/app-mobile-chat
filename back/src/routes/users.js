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


//[BACK/01-inscription]: Une route qui inscrit les utilisateurs 
router.post('/inscription', registerUsers);

//[BACK/02 verif token and secure route for connected users]
router.get('/signin', signIn, connectedUser);

//[BACK/02-connexion]: Une route qui connecte l'user et lui attribu du token
router.post('/auth',  authUsers)

//[BACK/03-get-all-users]: Une route qui retourne tous les utilisateurs dans une liste contenant les champs prenom et nom.
router.get('/', getUsers);

//[BACK/05-post-user-to-a-room]: Permet d'ajouter un user à une room. 
router.post('/room/:idRoom',signIn, addUserToRoom);
// ajouter un idRoom à la suite de cette route

//[BACK/07] get the details from 1 user
router.get('/details/:userId', signIn ,getUserDetails);

//[BACK/08-update-user]: Une route qui permet de mettre à jour les informations des utilisateurs
router.post('/update',signIn, updateUser);

module.exports = router;