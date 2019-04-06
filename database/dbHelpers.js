const db = require("./dbConfig.js");

module.exports = {
  registerUser
};

function registerUser(user) {
  return db("users").insert(user);
}
