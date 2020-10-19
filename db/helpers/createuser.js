const uuid = require('uuid');
const createError = require('http-errors');
const findByEmail = require('./findbyemail');
const write = require('./write');

// Creating user and writing it to db
const create = (u) => {
  const { email } = u;
  const user = findByEmail(email);

  if (user) {
    throw createError(400, 'User already exists');
  }
  const id = uuid.v4();
  db[id] = u;

  write(db);
  console.log(db[id]);
  const savedUser = { ...db[id] };
  savedUser.id = id;
  return savedUser;
};

module.exports = create;
