const express = require('express');
const router = express.Router();
const { getUsers, getSelf } = require('../controllers');

// Simple authentication check with a token

const secure = require('../middlewares/authorization');

router.get('/list', secure, getUsers);
router.get('/my', secure, getSelf);

module.exports = router;
