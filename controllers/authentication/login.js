const jwt = require('jsonwebtoken');
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
    //use the payload to store information about the user such as username, user role, etc.

    const payload = user;

    //create the access token with the shorter lifespan
    const accessToken = jwt.sign(payload, process.env.ENC, {
      algorithm: 'HS256',
      expiresIn: 66666,
    });

    return res.status(200).json(accessToken);
  } catch (err) {
    return next(err);
  }
};

module.exports = login;
