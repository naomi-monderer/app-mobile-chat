var express = require('express');


exports.isAdmin = (req, res, next) => {
    if(req.user.id_role === 1) {
        return next();
    }else {
        return res.status(400).json({ message: "An error has occured" });
    }
}
