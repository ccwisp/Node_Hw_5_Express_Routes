const express = require('express');
const router = express.Router();

const { login, register } = require('../controllers');

const validation = require('../middlewares/validation');

router.get('/', (req, res) => res.send('Greetings'));
router.post('/login', login);
router.post('/register', validation, register);

module.exports = router;
