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
  if (username && password) {
    User.findOne({ username })
      .then(user => {
        bcrypt
          .compare(password, user.password)
          .then(response => {
            if (response === true) {
              req.username = user.username;
              next();
            } else {
              res.status(422).json({ error: "username or password is wrong" });
            }
          })
          .catch(err => {
            res.send({ err: "Cannot log you in" });
          });
      })
      .catch(err => {
        res.status(422).json({ error: `Cannot find user: ${username}` });
      });
  }
};

module.exports = {
  authenticate,
  encryptUserPW,
  compareUserPW
};
