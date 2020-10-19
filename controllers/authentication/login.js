const JWT = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { getByLogin } = require('../../db');
const createError = require('http-errors');

// login controller
const login = async (req, res, next) => {
  try {
    const { login, password } = req.body;
    const id = getByLogin(login)[0];
    const user = getByLogin(login)[1];

    const { password: realPassword } = user || {};

    if (!password || !realPassword) {
      return next(createError(400, 'Invalid credentials'));
    }
    // Bcrypt compares password
    const validReg = await bcrypt.compare(password, realPassword);
    if (!validReg) {
      return next(createError(400, 'Invalid credentials'));
    }

    const token = JWT.sign(id, process.env.ENC);
    return res.status(200).json({ token });
  } catch (err) {
    return next(err);
  }
};

module.exports = login;
