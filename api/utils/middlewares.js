const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const User = require("../models/userModels");
const { mysecret } = require("../../config");
const SaltRounds = 11;

const authenticate = (req, res, next) => {
  const token = req.get("Authorization");
  if (token) {
    jwt.verify(token, mysecret, (err, decoded) => {
      if (err) return res.status(422).json(err);
      req.decoded = decoded;
      next();
    });
  } else {
    return res.status(403).json({
      error: "No token provided, must be set on the Authorization Header"
    });
  }
};

const encryptUserPW = (req, res, next) => {
  const { username, password } = req.body;
  if (username && password) {
    bcrypt
      .hash(password, SaltRounds)
      .then(hashedPass => {
        req.user = { username, password: hashedPass };
        next();
      })
      .catch(err => {
        res.send(err);
      });
  } else {
    res.status(422).json({ error: "You need a username and password yo." });
  }
};

const compareUserPW = (req, res, next) => {
  const { username, password } = req.body;
  // https://github.com/kelektiv/node.bcrypt.js#usage
  // TODO: Fill this middleware in with the Proper password comparing, bcrypt.compare()
  if { username && password } {
    User.find({ username })
  }
  // You'll need to find the user in your DB
  // Once you have the user, you'll need to pass the encrypted pw and the plaintext pw to the compare function
  // If the passwords match set the username on `req` ==> req.username = user.username; and call next();
};

module.exports = {
  authenticate,
  encryptUserPW,
  compareUserPW
};
