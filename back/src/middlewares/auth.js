const jwt = require("jsonwebtoken");

exports.verifyToken = (req, res, next) => {
    const token =
      req.body.token || req.query.token || req.headers["x-access-token"];
  
    if (!token) {
      return res.status(403).send("A token is required for authentication");
    }
    try {
      const decoded = jwt.verify(token, config.TOKEN_KEY);
      req.user = decoded;
    } catch (err) {
      return res.status(401).send("Invalid Token");
    }
    return next();
  };

exports.isLoggedIn = (req, res, next) => {
    // Get the JWT from the request header
    const token = req.headers['authorization'];
  
    // If there is no token, the user is not logged in
    if (!token) {
      return res.status(401).send({ message: 'Unauthorized' });
    }
  
    // Verify the JWT and check if it is valid
    jwt.verify(token, secret, (error, decoded) => {
      if (error) {
        return res.status(401).send({ message: 'Unauthorized' });
      }
  
      // If the JWT is valid, call the next middleware function
      next();
    });
}
