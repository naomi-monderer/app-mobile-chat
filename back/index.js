const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const app = express();
const jwt = require('jsonwebtoken');

// Parse request bodies as JSON
app.use(bodyParser.json());
// app.use(express.json());
app.use(express.urlencoded({ extended: false }));





var users = require('./src/routes/users');
app.use('/users', users);

// Verify route
app.get('/connected', (req, res) => {
  // Get token value to the json body
  const token = req.body.token;

  // If the token is present
  if(token){

      // Verify the token using jwt.verify method
      const decode = jwt.verify(token, 'secret');

      //  Return response with decode data
      res.json({
          login: true,
          data: decode
      });
  }else{

      // Return response with error
      res.json({
          login: false,
          data: 'error'
      });
  }
})

// Start server
app.listen(3000, () => {
  console.log('API server listening on port 3000');
});
