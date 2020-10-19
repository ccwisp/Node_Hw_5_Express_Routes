const bcrypt = require('bcrypt');
const { create } = require('../../db');

// registration controller

const register = async (req, res, next) => {
  try {
    const { email, password, login } = req.body;

    // Store user in the db with the hashed pass

    const user = {
      email,
      password: await bcrypt.hash(password, process.env.SALTROUNDS * 1),
      login,
    };

    const response = create(user);
    // Response with a null password ( we don`t need to send hashed pass to the client)

    response.password = null;
    return res.status(200).json(response);
  } catch (err) {
    return next(err);
  }
};

module.exports = register;
