const fs = require('fs-extra');
const path = require('path');

// Helper function to write into db
const write = (data) => {
  try {
    fs.writeFileSync(
      path.join(__dirname, '../', 'db.json'),
      JSON.stringify(data)
    );
  } catch (err) {
    throw err;
  }
};

module.exports = write;
