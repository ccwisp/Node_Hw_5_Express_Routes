const express = require('express');
const router = express.Router();
const { getUsers } = require('../controllers');

// Simple authentication check with a token

const secure = require('../middlewares/authorization');

router.get('/list', secure, getUsers);

module.exports = router;
