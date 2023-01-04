const db = require('../../database')
var express = require('express');
const {verifyToken} = require("../middlewares/auth");

var router = express.Router();

var {
	getUsers, authUsers
} = require('../controllers/usersController')


// router.use(verifyToken)
// Une route qui retourne tous les utilisateurs dans une liste contenant les champs prenom et nom.
router.get('/', getUsers);

router.post('/auth', authUsers)

module.exports = router;