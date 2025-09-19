const db = require('../db');

async function getUserByLogin(login) {
  const { rows } = await db.query(
    'SELECT id, login, password_hash FROM users WHERE login=$1',
    [login]
  );
  return rows[0];
}

async function createUser(login, passwordHash) {
  await db.query(
    'INSERT INTO users(login, password_hash) VALUES ($1, $2)',
    [login, passwordHash]
  );
}

module.exports = {
  getUserByLogin,
  createUser,
};


