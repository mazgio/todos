// File: knexfile.js (Knex configuration)
const dbConfig = require('./db');

module.exports = {
  development: {
    ...dbConfig,
    migrations: {
      directory: './api/migrations',
    },
    seed: {
      directory: './api/seeds',
    },
  }
};
