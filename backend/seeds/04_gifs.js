const gifs = require('../sample_data/gifs');

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('gifs')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('gifs').insert(gifs);
    });
};
