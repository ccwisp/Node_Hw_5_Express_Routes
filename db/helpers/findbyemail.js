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

module.exports = findByEmail;
