const knex = require('./knex');

module.exports = {
  create(gif) {
    return knex('gifs').insert(gif, '*');
  },
  delete(id) {
    return knex('gifs')
      .where('id', id)
      .del();
  },
  getOne(id) {
    return knex('gifs')
      .where('id', id)
      .first();
  }
};
