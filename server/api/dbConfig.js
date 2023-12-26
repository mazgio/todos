// File: dbConfig.js
const { Client } = require('pg');

const db = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // For local development
  },
});

db.connect();

module.exports = db;
