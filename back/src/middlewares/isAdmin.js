var express = require('express');


exports.isAdmin = (req, res, next) => {
    console.log(req.user);
    if(req.user.id_role === 2) {
        return next();
    }else {
        return res.status(400).json({ message: "You are not a an administrator" });
    }
}
