const {
  authenticateUser,
  registerUser,
  getMeFromSession,
  destroySession,
} = require("../services/authService");

async function me(req, res) {
  try {
    const result = getMeFromSession(req.session);
    if (result.authorized) return res.send({ login: result.login });
    return res.status(401).send({});
  } catch (e) {
    console.error(e);
    res.status(500).send({});
  }
}

async function login(req, res) {
  try {
    if (!req.body) return res.sendStatus(400);
    const { login, password } = req.body;
    const auth = await authenticateUser(login, password);
    if (!auth.ok) return res.send({ text: auth.message });
    req.session.userId = auth.user.id;
    req.session.login = auth.user.login;
    return res.send({ text: auth.message });
  } catch (e) {
    console.error(e);
    res.status(500).send({ error: "Internal error" });
  }
}

async function register(req, res) {
  try {
    if (!req.body) return res.sendStatus(400);
    const { login, password } = req.body;
    const result = await registerUser(login, password);
    return res.send({ text: result.message });
  } catch (e) {
    console.error(e);
    res.status(500).send({ error: "Internal error" });
  }
}

async function logout(req, res) {
  try {
    await destroySession(req.session);
    res.status(204).send();
  } catch (e) {
    console.error(e);
    res.status(500).send({});
  }
}

module.exports = {
  me,
  login,
  register,
  logout,
};
