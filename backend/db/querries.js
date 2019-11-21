const knex = require('./knex'); // Connection from knex file in db

module.exports = {
  getAll() {
    return knex('articles');
  },
  getOne(id) {
    return knex('articles')
      .where('id', id)
      .first();
  },
  create(article) {
    return knex('articles').insert(article, '*');
  },
  update(id, article) {
    return knex('articles')
      .where('id', id)
      .update(article, '*');
  },
  delete(id) {
    return knex('articles')
      .where('id', id)
      .del();
  }
};
