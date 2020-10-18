const path = require('path');
const uuid = require('uuid');
const fs = require('fs-extra');
const createError = require('http-errors');

// Helper function to write into db
const write = (data) => {
  try {
    fs.writeFileSync(path.join(__dirname, 'db.json'), JSON.stringify(data));
  } catch (err) {
    console.error(err);
  }
};

// Creating user and writing it to db
const create = (user) => {
  const foundUser = findByEmail(email);
  const { email } = user;
  if (foundUser) {
    throw createError(400, 'User already exists');
  }
  const userId = uuid.v4();
  db[userId] = user;
  write(db);
  const savedUser = { ...db[userId] };
  savedUser.id = userId;
  return savedUser;
};

// Returning list of all users
const getUsersList = () => {
  const users = [];
  Object.entries(db).forEach((u) => {
    const user = { ...u[1] };
    user.id = u[0];
    user.password = undefined;
    users.push(user);
  });
  return users;
};

// Get user by id
const getUser = (id) => {
  const user = db[id];
  if (!user) {
    throw createError(404, 'User not found');
  }
  user.id = id;
  return user;
};

// Get user by email
// Need this to find existing users in db
const findByEmail = (e) => {
  const user = Object.entries(db).filter((user) => {
    for (let i in user[1]) {
      if (user[1][i] === e && i === 'email') return true;
      else return false;
    }
  });
  return user[0];
};

// Preparing other functions to work properly
const connect = () => {
  try {
    const data = fs.readFileSync(path.join(__dirname, 'db.json'));
    if (!data.toString()) {
      db = {};
      write(db);
    } else {
      db = JSON.parse(data.toString());
    }
  } catch (err) {
    throw createError(400, 'Problem connecting with DB');
  }
};

module.exports = {
  getUsersList,
  getUser,
  create,
  findByEmail,
  connect,
};
