const JWT = require('jsonwebtoken');
const { getUser } = require('../db');
const createError = require('http-errors');

const userMiddleware = async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      throw createError(401, 'Please login to view this page.');
    }

    const userId = JWT.verify(authorization.split(' ')[1], process.env.ENC);
    if (!userId) {
      throw createError(401, 'Please login to view this page.');
    }

    const user = getUser(userId);
    if (!user) {
      throw createError(401, 'Please login to view this page.');
    }

    // If everything is ok, we are assigning the user
    req.session.user = user;

    return next();
  } catch (err) {
    return next(err);
  }
};

module.exports = userMiddleware;
