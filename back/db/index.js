const { Pool } = require('pg');

const pool = new Pool({
  host: process.env.PGHOST || 'localhost',
  port: Number(process.env.PGPORT || 5432),
  user: process.env.PGUSER || 'app',
  password: process.env.PGPASSWORD || 'app',
  database: process.env.PGDATABASE || 'organizer',
  max: 10,
  idleTimeoutMillis: 30000
});

module.exports = {
  query: (text, params) => pool.query(text, params),
  pool
};


