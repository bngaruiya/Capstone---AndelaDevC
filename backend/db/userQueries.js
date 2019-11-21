const knex = require('./knex');

module.exports = {
  getOne: function(id) {
    return knex('employees')
      .where('id', id)
      .first();
  },
  getOneByEmail: function(email) {
    return knex('employees')
      .where('email', email)
      .first();
  },
  create: function(user) {
    return knex('employees')
      .insert(user, 'id')
      .then(ids => {
        return ids[0];
      });
  }
};
