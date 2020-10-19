const createError = require('http-errors');

// Middleware for standard validation procedure
const validateMiddleware = async (req, res, next) => {
  try {
    const { email, password, login } = req.body;
    const reg_email = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;

    if (!(email && password && login)) {
      throw createError(400, 'Fields are not given');
    }

    if (email && !reg_email.test(email)) {
      throw createError(400, 'invalid email');
    }

    if (login && !(login.length >= 4)) {
      throw createError(400, 'invalid login');
    }

    return next();
  } catch (err) {
    return next(err);
  }
};

module.exports = validateMiddleware;
