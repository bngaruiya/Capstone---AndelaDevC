const employees = require('../sample_data/employees');

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('employees')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('employees').insert(employees);
    });
};
