// Get user by login
// Need this to find existing users in db

const getByLogin = (l) => {
  const user = Object.entries(db).find((user) => {
    if (user[1].login === l) {
      return true;
    } else return false;
  });

  return user;
};

module.exports = getByLogin;
