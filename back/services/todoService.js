const db = require('../db');

async function listTodosByMonth(userId, year, month) {
  const { rows } = await db.query(
    'SELECT day, item FROM todos WHERE user_id=$1 AND year=$2 AND month=$3 ORDER BY created_at ASC',
    [userId, year, month]
  );
  return rows;
}

async function listTodoItemsForDay(userId, year, month, day) {
  const { rows } = await db.query(
    'SELECT item FROM todos WHERE user_id=$1 AND year=$2 AND month=$3 AND day=$4 ORDER BY created_at ASC',
    [userId, year, month, day]
  );
  return rows.map(r => r.item);
}

async function addTodo(userId, year, month, day, item) {
  await db.query(
    'INSERT INTO todos(user_id, year, month, day, item) VALUES ($1,$2,$3,$4,$5)',
    [userId, year, month, day, item]
  );
}

async function removeTodoByIndex(userId, year, month, day, index) {
  const { rows } = await db.query(
    'SELECT id FROM todos WHERE user_id=$1 AND year=$2 AND month=$3 AND day=$4 ORDER BY created_at ASC OFFSET $5 LIMIT 1',
    [userId, year, month, day, index]
  );
  if (rows.length) {
    await db.query('DELETE FROM todos WHERE id=$1', [rows[0].id]);
  }
}

module.exports = {
  listTodosByMonth,
  listTodoItemsForDay,
  addTodo,
  removeTodoByIndex,
};


