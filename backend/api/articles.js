const express = require('express');
const jwt = require('jsonwebtoken');

const router = express.Router();

const querries = require('../db/articleQueries');
const verifyToken = require('../auth/index').verifyToken;

function isValidId(req, res, next) {
  if (!isNaN(req.params.id)) {
    return next();
  } else {
    next(new Error('Invalid ID'));
  }
}

function validArticle(article) {
  const hasTitle =
    typeof article.title == 'string' && article.title.trim() != '';
  const hasContent =
    typeof article.content == 'string' && article.content.trim() != '';
  return hasTitle && hasContent;
}

router.get('/', verifyToken, (req, res) => {
  jwt.verify(req.token, 'secretkey', (err, authData) => {
    if (err) {
      res.json({
        message: 'Forbidden. Please Log in'
      });
    } else {
      querries.getAll().then(articles => {
        res.json(articles);
      });
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
      querries.getOne(req.params.id).then(article => {
        if (article) {
          res.json(article);
        } else {
          res.status(404);
          next();
        }
      });
    }
  });
});

router.post('/', verifyToken, (req, res, next) => {
  jwt.verify(req.token, 'secretkey', (err, authData) => {
    if (err) {
      res.json({
        message: 'Forbidden. Please Log in'
      });
    } else {
      if (validArticle(req.body)) {
        querries.create(req.body).then(article => {
          res.json({
            article: article[0],
            authData
          });
        });
      } else {
        res.json({ error });
      }
    }
  });
});

router.put('/:id', isValidId, verifyToken, (req, res, next) => {
  jwt.verify(req.token, 'secretkey', (err, authData) => {
    if (err) {
      res.json({
        message: 'Forbidden. Please Log'
      });
    } else {
      if (validArticle(req.body)) {
        querries.update(req.params.id, req.body).then(article => {
          res.json(article[0]);
        });
      } else {
        next(new Error('Invalid Article'));
      }
    }
  });
});

router.delete('/:id', isValidId, (req, res, next) => {
  jwt.verify(req.token, 'secretkey', (err, authData) => {
    if (err) {
      res.json({
        message: 'Forbidden. Please Log'
      });
    } else {
      querries.delete(req.params.id).then(() => {
        res.json({
          deleted: true
        });
      });
    }
  });
});

module.exports = router;
