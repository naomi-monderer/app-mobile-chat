var express = require('express');
var router = express.Router();
var { adminUpdateRooms } = require('../controllers/adminController')
const {isAdmin} = require('../middlewares/isAdmin');
// Une route qui 
router.patch('rooms/:id/update', adminUpdateRooms);

module.exports = router;