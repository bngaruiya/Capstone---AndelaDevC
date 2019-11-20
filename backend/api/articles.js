const express = require('express');

const router = express.Router();

const querries = require('../db/querries');

function isValidId(req, res, next) {
  if (!isNaN(req.params.id)) {
    return next();
  } else {
    next(new Error('Invalid ID'));
  }
}

router.get('/', (req, res) => {
  querries.getAll().then(articles => {
    res.json(articles);
  });
});

router.get('/:id', isValidId, (req, res, next) => {
  querries.getOne(req.params.id).then(article => {
    if (article) {
      res.json(article);
    } else {
      res.status(404);
      next();
    }
  });
});

module.exports = router;
