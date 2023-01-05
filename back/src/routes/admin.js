var express = require('express');
var router = express.Router();
var { signIn } = require('../middlewares/auth')
var { adminUpdateRooms, adminUpdateUser } = require('../controllers/adminController')
const {isAdmin} = require('../middlewares/isAdmin');
const {auth} = require('../middlewares/auth');

// Une route qui  update le nom des rooms 
router.patch('/rooms/:id/update', adminUpdateRooms);
// Une route qui update le login d'un user
router.patch('/users/:id/update', adminUpdateUser);


module.exports = router;