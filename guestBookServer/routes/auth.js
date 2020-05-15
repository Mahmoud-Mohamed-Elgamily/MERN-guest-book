const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const express = require("express");
let User = mongoose.model("user");
const bcrypt = require("bcryptjs");
const router = express.Router();

router.post("/login", (req, res) => {
  User.findOne({ userName: req.body.userName })
    .then((data) => {
      if (data) {
        if (bcrypt.compare(req.body.password, data.password)) {
          const token = jwt.sign({ id: user._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: 36000 });

          return res.status(200).json({ token, user: { id: user._id } });
        }
      }
      return res.status(401).send("Wrong credentials");
    })
    .catch((err) => {
      res.status(503).send('database server unavailable');
    })
})


module.exports = router;