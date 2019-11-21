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
  }
};
