const createError = require('http-errors');

// Returning list of all users

const getUsersList = () => {
  try {
    const users = [];
    Object.entries(db).forEach((u) => {
      const user = { ...u[1] };
      user.id = u[0];
      user.password = undefined;
      users.push(user);
    });
    return users;
  } catch (err) {
    throw createError(300, 'Cannot retrieve list of users');
  }
};

module.exports = getUsersList;
