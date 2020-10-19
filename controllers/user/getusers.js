const { getUsersList } = require('../../db');

// Return list of all users
const getUsers = (req, res, next) => {
  try {
    const users = getUsersList();
    return res.status(200).json(users);
  } catch (err) {
    return next(err);
  }
};

module.exports = getUsers;
