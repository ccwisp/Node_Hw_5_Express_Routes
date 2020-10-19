const bcrypt = require('bcrypt');
const { create } = require('../../db');
const createError = require('http-errors');

// registration controller

const register = async (req, res, next) => {
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

    createdUser.password = undefined;

    return res.status(200).json({ user: createdUser });
  } catch (err) {
    return next(err);
  }
};

module.exports = register;
