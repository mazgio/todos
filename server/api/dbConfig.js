// File: dbConfig.js
const dbPath = process.env.NODE_ENV === 'production' ? '/path/to/your/db/file.db' : './api/todos.db3';

const dbConfig = {
  client: 'sqlite3',  // Specify the database client (in this case, SQLite)
  connection: {
    filename: dbPath,
  },
  useNullAsDefault: true,
};

const knex = require('knex')(dbConfig);

module.exports = knex;
