const domain = require("../services/todoDomainService");

async function getDays(req, res) {
  try {
    if (!req.body) return res.sendStatus(400);
    const { year, month, login } = req.body;
    const days = await domain.buildMonthForUser({ login, year, month });
    res.send(days);
  } catch (e) {
    console.error(e);
    res.status(500).send({ error: "Internal error" });
  }
}

async function getDay(req, res) {
  try {
    if (!req.body) return res.sendStatus(400);
    const { day, month, year, userLogin } = req.body;
    const dto = await domain.buildDayForUser({
      login: userLogin,
      year,
      month,
      day,
    });
    res.send(dto);
  } catch (e) {
    console.error(e);
    res.status(500).send({ error: "Internal error" });
  }
}

async function addToList(req, res) {
  try {
    if (!req.body) return res.sendStatus(400);
    const { day, month, year, business, login } = req.body;
    const result = await domain.addListItem({
      login,
      year,
      month,
      day,
      item: business,
    });
    res.send({ text: result.text });
  } catch (e) {
    console.error(e);
    res.status(500).send({ error: "Internal error" });
  }
}

async function removeFromList(req, res) {
  try {
    if (!req.body) return res.sendStatus(400);
    const { day, month, year, index, login } = req.body;
    const result = await domain.removeListItemByIndex({
      login,
      year,
      month,
      day,
      index,
    });
    res.send({ text: result.text });
  } catch (e) {
    console.error(e);
    res.status(500).send({ error: "Internal error" });
  }
}

module.exports = {
  getDays,
  getDay,
  addToList,
  removeFromList,
};
