var express = require('express');
var router = express.Router();
var { signIn } = require('../middlewares/auth')
var { adminUpdateRooms } = require('../controllers/adminController')
const {isAdmin} = require('../middlewares/isAdmin');
const {auth} = require('../middlewares/auth');

// Une route qui  update le nom des rooms 
router.patch('/rooms/:id/update', [signIn, isAdmin], adminUpdateRooms);


module.exports = router;