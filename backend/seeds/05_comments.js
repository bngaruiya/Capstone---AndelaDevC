const comments = require('../sample_data/comments');

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('comments')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('comments').insert(comments);
    });
};
