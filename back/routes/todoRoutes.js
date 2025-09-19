const express = require('express');
const router = express.Router();
const todo = require('../controllers/todoController');

router.post('/get-days', todo.getDays);
router.post('/get-day', todo.getDay);
router.post('/addToList', todo.addToList);
router.post('/removeFromList', todo.removeFromList);

module.exports = router;


