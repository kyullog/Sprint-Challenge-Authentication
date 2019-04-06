const axios = require("axios");
const bcrypt = require("bcryptjs");

const { authenticate } = require("../auth/authenticate");
const db = require("../database/dbHelpers.js");

const genericError = { error: "There was a problem processing your request" };

module.exports = server => {
  server.post("/api/register", register);
  server.post("/api/login", login);
  server.get("/api/jokes", authenticate, getJokes);
};

async function register(req, res) {
  // implement user registration
  try {
    const user = req.body;
    const hashword = bcrypt.hashSync(user.password, 9);
    user.password = hashword;
    console.log(user.password);
    const [newUserId] = await db.registerUser(user);
    if (newUserId) {
      res.status(201).json(newUserId);
    }
  } catch {
    res.status(500).json(genericError);
  }
}

function login(req, res) {
  // implement user login
}

function getJokes(req, res) {
  const requestOptions = {
    headers: { accept: "application/json" }
  };

  axios
    .get("https://icanhazdadjoke.com/search", requestOptions)
    .then(response => {
      res.status(200).json(response.data.results);
    })
    .catch(err => {
      res.status(500).json({ message: "Error Fetching Jokes", error: err });
    });
}
