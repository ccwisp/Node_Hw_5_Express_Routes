const express = require('express');
const router = express.Router();
const { getUsers } = require('../controllers/user');

// Simple authentication check with a token

const authMiddleware = require('../middlewares/user');

router.get('/', authMiddleware, getUsers);

module.exports = router;
