const express = require('express');
const router = express.Router();

const authRoutes = require('./authRoutes');
const todoRoutes = require('./todoRoutes');

router.use('/', authRoutes);
router.use('/', todoRoutes);

module.exports = router;


