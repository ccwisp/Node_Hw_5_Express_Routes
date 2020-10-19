const jwt = require('jsonwebtoken');
const { getByLogin } = require('../db');
const createError = require('http-errors');

const userMiddleware = async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      throw createError(401, 'Please login to view this page.');
    }

    const payload = jwt.verify(authorization, process.env.ENC);

    if (!getByLogin(payload.login)) {
      throw createError(401, 'Please login to view this page.');
    }
    return next();
  } catch (err) {
    return next(err);
  }
};

module.exports = userMiddleware;
