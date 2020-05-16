const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
require('../models/eventModel');
require('../models/replyModel');
let Event = mongoose.model("event");


router.get('/', function (req, res) {
  Event.find({})
    .populate("owner replies")
    .then((data) => {
      return res.status(200).send(data);
    })
    .catch(err => res.status(503).send("DataBaseException"));
});

router.post('/', function (req, res) {
  req.body.owner = req.body.userId;
  const newEvent = new Event(req.body);
  newEvent.save()
    .then((data) => {
      return res.status(200).send(data);
    })
    .catch(err => res.status(503).send("DataBaseException"));
});

router.put('/:id', function (req, res) {
  Event.findByIdAndUpdate(req.body._id, req.body, { useFindAndModify: false, new: true })
    .then((data) => {
      console.log(data);
      return res.status(200).send(data);
    })
    .catch(err => res.status(503).send("DataBaseException"));
});

router.delete('/:id', function (req, res) {
  Event.findByIdAndDelete(req.body._id)
    .then((data) => {
      return res.status(200).send("deleted");
    })
    .catch(err => res.status(503).send("DataBaseException"));
});

module.exports = router;