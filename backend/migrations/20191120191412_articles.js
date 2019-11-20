exports.up = function(knex) {
  return knex.schema.createTable('articles', table => {
    table.increments();
    table.text('title');
    table.text('image');
    table.text('content');
    table.datetime('createdon', { precision: 6 }).defaultTo(knex.fn.now());
    table.integer('authorid');
    table.integer('categoryid');
    table
      .foreign('authorid')
      .references('employees.id')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
    table.foreign('categoryid').references('categories.id');
  });
};
exports.down = function(knex) {
  return knex.schema.dropTable('articles');
};
