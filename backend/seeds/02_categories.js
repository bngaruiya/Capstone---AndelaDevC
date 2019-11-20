const categories = require('../sample_data/categories');

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('categories')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('categories').insert(categories);
    });
};
