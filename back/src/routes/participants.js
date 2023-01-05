var express = require('express');
var router = express.Router();
var {signIn} = require('../middlewares/auth');
var {
	deleteUser, 
} = require('../controllers/participantsController')

// BACK/06 route qui retourne tous les utilisateurs dans une liste contenant les champs prenom et nom.
router.delete('/:roomId/:userId', signIn ,deleteUser);

module.exports = router;