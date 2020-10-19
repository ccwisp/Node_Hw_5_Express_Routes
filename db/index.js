const getUsersList = require('./helpers/getuserslist');
const getUser = require('./helpers/getuser');
const create = require('./helpers/createuser');
const getByLogin = require('./helpers/getByLogin');
const connect = require('./helpers/connect');

module.exports = {
  getUsersList,
  getUser,
  create,
  getByLogin,
  connect,
};
