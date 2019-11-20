exports.up = function(knex) {
  return knex.schema.createTable('comments', table => {
    table.increments();
    table.text('content');
    table.datetime('createdon', { precision: 6 }).defaultTo(knex.fn.now());
    table.integer('articlerefid');
    table.integer('gifrefid');
    table.integer('userrefid');
    table
      .foreign('articlerefid')
      .references('articles.id')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
    table
      .foreign('gifrefid')
      .references('gifs.id')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
    table
      .foreign('userrefid')
      .references('employees.id')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('comments');
};
