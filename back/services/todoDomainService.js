const { getUserByLogin } = require('./userService');
const { listTodosByMonth, listTodoItemsForDay, addTodo, removeTodoByIndex } = require('./todoService');
const { generateMonthDays, generateSingleDay, updateMonthToMonday, updateMonthTo42Days } = require('./calendarService');

async function buildMonthForUser({ login, year, month }) {
  const user = await getUserByLogin(login);
  if (!user) return [];

  const monthDays = generateMonthDays(Number(year), month);
  const rows = await listTodosByMonth(user.id, Number(year), month);
  const dayToItems = new Map();
  rows.forEach(r => {
    const list = dayToItems.get(r.day) || [];
    list.push(r.item);
    dayToItems.set(r.day, list);
  });
  let daysToSend = monthDays.map(d => ({ ...d, toDoList: dayToItems.get(d.day) || [] }));
  daysToSend = updateMonthToMonday(daysToSend);
  daysToSend = updateMonthTo42Days(daysToSend);
  return daysToSend;
}

async function buildDayForUser({ login, year, month, day }) {
  const user = await getUserByLogin(login);
  if (!user) return {};
  const base = generateSingleDay(Number(year), month, Number(day));
  const items = await listTodoItemsForDay(user.id, Number(year), month, Number(day));
  return { ...base, toDoList: items };
}

async function addListItem({ login, year, month, day, item }) {
  const user = await getUserByLogin(login);
  if (!user) return { ok: false, text: 'no such user' };
  await addTodo(user.id, Number(year), month, Number(day), item);
  return { ok: true, text: 'list updated' };
}

async function removeListItemByIndex({ login, year, month, day, index }) {
  const user = await getUserByLogin(login);
  if (!user) return { ok: false, text: 'no such user' };
  await removeTodoByIndex(user.id, Number(year), month, Number(day), Number(index));
  return { ok: true, text: 'list removed' };
}

module.exports = {
  buildMonthForUser,
  buildDayForUser,
  addListItem,
  removeListItemByIndex,
};


