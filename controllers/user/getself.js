// Return current user
const jwt = require('jsonwebtoken');
const getSelf = (req, res, next) => {
  try {
    const { authorization } = req.headers;
    const payload = jwt.verify(authorization, process.env.ENC);
    const { email, password, login } = payload;
    const user = { email, password, login };
    return res.status(200).json(user);
  } catch (err) {
    return next(err);
  }
};

module.exports = getSelf;
