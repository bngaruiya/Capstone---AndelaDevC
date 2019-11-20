exports.up = function(knex) {
  return knex.schema.createTable('gifs', table => {
    table.increments();
    table.text('title');
    table.text('image');
    table.datetime('createdon', { precision: 6 }).defaultTo(knex.fn.now());
    table.integer('authorid');
    table
      .foreign('authorid')
      .references('employees.id')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('gifs');
};
