const express = require('express');
const router = express.Router();

const { signIn, signUp } = require('../controllers/index');

const validation = require('../middlewares/validate');

router.get('/', (req, res) => res.send('Greetings'));
router.post('/signin', signIn);
router.post('/signup', validation(), signUp);

module.exports = router;
