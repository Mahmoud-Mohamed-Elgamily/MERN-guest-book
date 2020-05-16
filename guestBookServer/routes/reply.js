const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
require('../models/eventModel');
require('../models/replyModel');
let Event = mongoose.model('event');
let Reply = mongoose.model('reply');

/* GET users listing. */
router.post('/', function (req, res, next) {
  console.log(req.body);
  const reply = new Reply({ reply: req.body.reply });
  reply.save()
    .then(data => {
      Event.findByIdAndUpdate(req.body.eventId, { $push: { replies: data._id } }, { useFindAndModify: false, new: true })
        .populate("replies")
        .then(updatedEvent => {
          console.log(updatedEvent);
          return res.status(200).send(updatedEvent);
        })
        .catch(err => res.status(503).send("DataBaseException"));
    });

});

module.exports = router;
