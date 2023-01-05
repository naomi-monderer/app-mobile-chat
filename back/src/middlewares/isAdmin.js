var express = require('express');


exports.isAdmin = (req, res, next) =>{
   
    try {
        if (req.user.id_role === 0 || 3) {
            return res.status(400).json({ message: "Access denied" });
        }else if(req.user.id_role === 1) {
             next();
        }
       
    } catch (e) {
        return res.status(500).json({ message: "An error has occured" });
    }
}