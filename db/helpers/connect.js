const createError = require('http-errors');
const fs = require('fs-extra');
const path = require('path');
const write = require('./write');

// Preparing other functions to work properly
const connect = () => {
  try {
    const data = fs.readFileSync(path.join(__dirname, '../', 'db.json'));
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

module.exports = connect;
