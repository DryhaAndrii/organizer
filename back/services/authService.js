const bcrypt = require('bcrypt');
const { getUserByLogin, createUser } = require('./userService');

async function authenticateUser(login, password) {
  const user = await getUserByLogin(login);
  if (!user) {
    return { ok: false, message: `There are no user with login: ${login}` };
  }
  const ok = await bcrypt.compare(password, user.password_hash);
  if (!ok) {
    return { ok: false, message: 'wrong password' };
  }
  return { ok: true, user, message: 'success' };
}

async function registerUser(login, password) {
  const existing = await getUserByLogin(login);
  if (existing) {
    return { ok: false, message: 'User already exists' };
  }
  const password_hash = await bcrypt.hash(password, 10);
  await createUser(login, password_hash);
  return { ok: true, message: `${login} Registered! Try to login now` };
}

function getMeFromSession(session) {
  if (session && session.userId) {
    return { authorized: true, login: session.login };
  }
  return { authorized: false };
}

function destroySession(session) {
  return new Promise((resolve) => {
    session?.destroy(() => resolve());
  });
}

module.exports = {
  authenticateUser,
  registerUser,
  getMeFromSession,
  destroySession,
};


