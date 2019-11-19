const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use('/', (req, res) => {
  res.json({
    message: 'Welcome to the API!!'
  });
});

module.exports = app;
