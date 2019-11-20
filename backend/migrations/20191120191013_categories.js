exports.up = function(knex) {
  return knex.schema.createTable('categories', table => {
    table.increments();
    table.text('category');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('categories');
};
