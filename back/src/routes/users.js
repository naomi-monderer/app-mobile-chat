const db = require('../../database')
var express = require('express');
var {signIn} = require('../middlewares/auth');

var router = express.Router();

var {
	getUsers, authUsers, test
} = require('../controllers/usersController')


// router.use('/test',verifyToken)
// Une route qui retourne tous les utilisateurs dans une liste contenant les champs prenom et nom.
router.get('/', getUsers);

// //route [BACK/02 verif token]
router.get('/signin', signIn, test);

//route [BACK/02 connexion de l'user et attribution du token]
router.post('/auth',  authUsers)

module.exports = router;