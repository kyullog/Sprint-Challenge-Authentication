const jswToken = require("jsonwebtoken");

const jswTokenKey = process.env.JWT_SECRET || "not so secret secret";

function makeToken(user) {
  const payload = {
    id: user.id,
    username: user.username
  };

  const options = {
    expiresIn: "6h"
  };
  return jswToken.sign(payload, jswTokenKey, options);
}

module.exports = makeToken;
