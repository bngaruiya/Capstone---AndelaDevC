const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const articles = require('./api/articles');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api/v1/articles', articles);

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
    error: (res.locals.error = req.app.get('env') === 'development' ? err : {})
  });
});

module.exports = app;
