// Update with your config settings.

module.exports = {
  development: {
    client: 'pg',
    connection: {
      host: 'localhost',
      user: 'benah',
      password: 'benah0560',
      database: 'TeamWork'
    }
  },
  test: {
    client: 'pg',
    connection: {
      host: 'localhost',
      user: 'benah',
      password: 'benah0560',
      database: 'testTeamWork'
    }
  }
};
