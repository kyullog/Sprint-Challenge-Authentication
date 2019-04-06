const db = require("./dbConfig.js");

module.exports = {
  registerUser,
  getUser
};

function registerUser(user) {
  return db("users").insert(user);
}

function getUser({ username }) {
  return db("users")
    .where({ username })
    .first();
}
