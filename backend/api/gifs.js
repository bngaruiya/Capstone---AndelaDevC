const express = require('express');
const jwt = require('jsonwebtoken');

const queries = require('../db/gifsQueries');
const verifyToken = require('../auth/index').verifyToken;

router = express.Router();

function isValidId(req, res, next) {
  if (!isNaN(req.params.id)) {
    return next();
  } else {
    next(new Error('Invalid ID'));
  }
}

function validGif(gif) {
  hasTitle = typeof gif.title == 'string' && gif.image.trim() != '';
  hasImage = typeof gif.image == 'string' && gif.image.trim() != '';
  return hasTitle && hasImage;
}

router.post('/', verifyToken, (req, res, next) => {
  jwt.verify(req.token, 'secretkey', (err, authData) => {
    if (err) {
      res.json({
        message: 'Forbidden. Please Log in'
      });
    } else {
      if (validGif(req.body)) {
        queries.create(req.body).then(gif => {
          res.json(gif[0]);
        });
      } else {
        res.json({ error });
      }
    }
  });
});

router.get('/:id', isValidId, verifyToken, (req, res, next) => {
  jwt.verify(req.token, 'secretkey', (err, authData) => {
    if (err) {
      res.json({
        message: 'Forbidden. Please Log in'
      });
    } else {
      queries.getOne(req.params.id).then(gif => {
        if (gif) {
          res.json(gif);
        } else {
          res.status(404);
          next();
        }
      });
    }
  });
});

router.delete('/:id', isValidId, verifyToken, (req, res) => {
  jwt.verify(req.token, 'secretkey', (err, authData) => {
    res.json({
      message: 'Forbidden. Please Log in'
    });
  });
  queries.delete(req.params.id).then(() => {
    res.json({
      deleted: true
    });
  });
});

module.exports = router;
