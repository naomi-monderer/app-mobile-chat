const db = require('../../database')
var express = require('express');
const {verifyToken} = require("../middlewares/auth");

var router = express.Router();

var {
	getUsers, authUsers
} = require('../controllers/usersController')


// router.use('/test',verifyToken)
// Une route qui retourne tous les utilisateurs dans une liste contenant les champs prenom et nom.
router.get('/', getUsers);


//route [BACK/02 connexion]
router.post('/auth', authUsers)

module.exports = router;