const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const articles = require('./api/articles');
const gifs = require('./api/gifs');
const auth = require('./auth').router;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api/v1/auth', auth);
app.use('/api/v1/articles', articles);
app.use('/api/v1/gifs', gifs);

// Catch 404 and forward to Error handler
app.use((req, res, next) => {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: req.app.get('env') === 'development' ? err : {}
  });
});

module.exports = app;
