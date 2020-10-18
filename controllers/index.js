const JWT = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { findByEmail, create } = require('../db');
const createError = require('http-errors');

// Sign in controller
const signIn = async (req, res, next) => {
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
    return next(err);
  }
};

const signUp = async (req, res, next) => {
  try {
    const { email, password, login } = req.body;
    // Store user in the db with the hashed pass
    const hashedPass = await bcrypt.hash(password, process.env.SALTROUNDS * 1);
    const user = {
      email,
      password: hashedPass,
      login,
    };
    // Response with a null password ( we don`t need to send hashed pass to the client)
    const createdUser = { ...create(user) };
    createdUser.password = null;
    return res.status(200).json({ user: createdUser });
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  signIn,
  signUp,
};
