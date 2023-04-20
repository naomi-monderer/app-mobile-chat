var express = require('express');


exports.isAdmin = (req, res, next) => {
	console.log('req', req.body.id_role_admin)
    if (req.body.id_role_admin === 2) {
    	return next();
	}else {
		return res.status(400).json({ message: "You are not an administrator" });
	}
  }
  