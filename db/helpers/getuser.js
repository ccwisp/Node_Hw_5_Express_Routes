const createError = require('http-errors');

// Get user by id
const getUser = (id) => {
  try {
    const user = db[id];
    if (!user) {
      throw createError(500, 'User not found');
    }
    user.id = id;
    return user;
  } catch (err) {
    throw createError(500, 'Cannot retrieve the user');
  }
};

module.exports = getUser;
