const uuid = require('uuid');
const createError = require('http-errors');
const getByLogin = require('./getByLogin');
const write = require('./write');

// Creating user and writing it to db
const create = (u) => {
  const { login } = u;
  const user = getByLogin(login);
  console.log(user);

  if (user) {
    throw createError(400, 'User already exists');
  }
  const id = uuid.v4();
  db[id] = u;
  write(db);
  return db[id];
};

module.exports = create;
