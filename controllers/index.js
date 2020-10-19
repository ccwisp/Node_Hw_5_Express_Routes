const register = require('./authentication/register');
const login = require('./authentication/login');
const getUsers = require('./user/getusers');
const getSelf = require('./user/getself');

module.exports = { register, login, getUsers, getSelf };
