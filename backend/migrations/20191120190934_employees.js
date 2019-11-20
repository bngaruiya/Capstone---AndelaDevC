exports.up = function(knex) {
  return knex.schema.createTable('employees', table => {
    table.increments();
    table.text('firstName');
    table.text('lastName');
    table.text('email');
    table.text('password');
    table.text('gender');
    table.text('jobRole');
    table.text('department');
    table.text('address');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('employees');
};
