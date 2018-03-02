const User = require("../models/userModels");
const bcrypt = require("bcrypt");

const createUser = (req, res) => {
  const { username, password } = req.body;
  User.create(req.user)
    .then(user => {
      res
        .status(200)
        .json({ message: `${user.username} successfully created!` });
    })
    .catch(err => {
      res.status(500).json({ error: "Oh no! didn't work, that sucks" });
    });
};

module.exports = {
  createUser
};
