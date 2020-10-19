const JWT = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { findByEmail } = require('../../db');
const createError = require('http-errors');

// login controller
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const id = findByEmail(email)[0];
    const user = findByEmail(email)[1];

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
    return next(createError(400, 'Login failed'));
  }
};

module.exports = login;
