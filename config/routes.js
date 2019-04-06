const axios = require("axios");
const bcrypt = require("bcryptjs");

const createJWT = require("../auth/tokenMaker.js");
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
    const [newUserId] = await db.registerUser(user);
    if (newUserId) {
      const userInfo = db.getUser(user);
      const token = createJWT(userInfo);
      res.status(201).json({ newUserId, token });
    }
  } catch {
    res.status(500).json(genericError);
  }
}

async function login(req, res) {
  // implement user login
  try {
    const user = req.body;
    const gotUser = await db.getUser(user);
    if (gotUser && bcrypt.compareSync(user.password, gotUser.password)) {
      const token = createJWT(gotUser);
      res.status(200).json({ message: "Logged in!", token });
    } else {
      res.status(404).json({ error: "Please provide proper credentials" });
    }
  } catch {
    res.status(500).json(genericError);
  }
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
