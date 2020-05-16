const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();
require('../models/userModel')
let User = mongoose.model("user");

let hashCode = 'TopSecret';
// generate token
const getToken = (id) => {
  return jwt.sign({ id: id }, hashCode);
}

router.post("/login", (req, res) => {
  console.log(req.body);

  User.findOne({ userName: req.body.userName })
    .then((data) => {
      if (data) {
        if (bcrypt.compare(req.body.password, data.password)) {
          const token = getToken(data._id);
          return res.status(200).json({ token, user: { id: data._id } });
        }
        return res.status(401).send("Wrong credentials");
      }
    })
    .catch((err) => {
      console.log(err);
      return res.status(503).send(err);//'database server unavailable'
    })
})

router.post("/register", (req, res) => {

  if (req.body.password == req.body.password2) {
    delete req.body.password2
    req.body.password = bcrypt.hashSync(req.body.password, 12);

    const newSpeaker = new User(req.body);
    newSpeaker.save()
      .then((data) => {
        const token = getToken(data._id);
        return res.status(200).json({ token, user: { data } });
      })
      .catch((err) => {
        return res.status(503).send(err);
      })
  } else {
    return res.status(401).send('Password Did not match');
  }
})

const Authenticate = (token) => {
  return jwt.verify(token, hashCode, (err, decoded) => {
    if (decoded)
      return decoded;
    else
      return 0
  });
}

module.exports = router;
module.exports.auth = Authenticate;