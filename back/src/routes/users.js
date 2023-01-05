var express = require('express');
const { verifyToken } = require('../middlewares/auth');
var router = express.Router();
var {
	getUsers, authUsers, addUserToRoom
} = require('../controllers/usersController')

// Une route qui retourne tous les utilisateurs dans une liste contenant les champs prenom et nom.
router.get('/', getUsers);
router.post('/:id/room', addUserToRoom);
router.get('/login', authUsers);

module.exports = router;