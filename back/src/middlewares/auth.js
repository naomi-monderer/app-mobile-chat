const jwt = require("jsonwebtoken");

exports.verifyToken = (req, res, next) => {
    // let token = req.hasOwnProperty("authorization");
    console.log('token', req)
    if (!req) {
      return res.status(403).send("A token is required for authentication");
    }
    try {
      console.log('ok')
      // const decoded = jwt.verify(token, config.TOKEN_KEY);
      // req.user = decoded;
      // console.log('req', req.user)
    } catch (err) {
      return res.status(401).send("Invalid Token");
    }
    return next();
  };