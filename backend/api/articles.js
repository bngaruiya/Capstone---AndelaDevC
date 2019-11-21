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

function validArticle(article) {
  const hasTitle =
    typeof article.title == 'string' && article.title.trim() != '';
  const hasContent =
    typeof article.content == 'string' && article.content.trim() != '';
  return hasTitle && hasContent;
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

router.post('/', (req, res, next) => {
  if (validArticle(req.body)) {
    querries.create(req.body).then(article => {
      res.json(article[0]);
    });
  } else {
    res.json({ error });
  }
});

router.put('/:id', isValidId, (req, res, next) => {
  if (validArticle(req.body)) {
    querries.update(req.params.id, req.body).then(article => {
      res.json(article[0]);
    });
  } else {
    next(new Error('Invalid Article'));
  }
});

router.delete('/:id', isValidId, (req, res, next) => {
  querries.delete(req.params.id).then(() => {
    res.json({
      deleted: true
    });
  });
});

module.exports = router;
