var express = require('express');
var router = express.Router();
var { getUsers, adminUpdateUser
} = require('../controllers/usersController')

// Une route qui retourne tous les utilisateurs dans une liste contenant les champs prenom et nom.
router.get('/', getUsers);
router.patch('/admin/update/:id', adminUpdateUser);

module.exports = router;