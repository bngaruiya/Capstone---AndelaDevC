const articles = require('../sample_data/articles');

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('articles')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('articles').insert(articles);
    });
};
