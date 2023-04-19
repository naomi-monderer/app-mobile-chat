var express = require('express');


exports.isAdmin = (req, res, next) => {
	const { idAdmin, username, id_role } = req.user;
	const userInfo = { idAdmin, username, id_role };
	if (id_role === 2) {
		req.userInfo = userInfo
	  return [next()];
	} else {
	  return res.status(400).json({ message: "You are not an administrator", userInfo });
	}
  }
  