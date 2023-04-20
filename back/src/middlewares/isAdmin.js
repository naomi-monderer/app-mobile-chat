var express = require('express');


exports.isAdmin = (req, res, next) => {
<<<<<<< HEAD
	console.log('req', req.body.id_role_admin)
    if (req.body.id_role_admin === 2) {
    	return next();
	}else {
		return res.status(400).json({ message: "You are not an administrator" });
=======
	const { idAdmin, username, id_role } = req.user;
	const userInfo = { idAdmin, username, id_role };
	if (id_role === 2) {
		req.userInfo = userInfo
	  return [next()];
	} else {
	  return res.status(400).json({ message: "You are not an administrator", userInfo });
>>>>>>> FRONT/17-2_fix_issues
	}
  }
  