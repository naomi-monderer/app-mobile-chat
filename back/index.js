const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();

// Parse request bodies as JSON
app.use(bodyParser.json());



// Start server
app.listen(3000, () => {
  console.log('API server listening on port 3000');
});
