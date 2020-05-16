const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
require('../models/eventModel')
require('../models/replyModel')
let Event = mongoose.model("event");

const getEvents = () => {
  return Event.find({})
    .populate("owner replies")
    .then((data) => {
      return data;
    }).catch((err) => {
      return Error('DataBaseException')
    })
}

/* GET users listing. */
router.get('/', function (req, res) {
  getEvents()
    .then(data => {
      if (data)
        return res.status(200).json(data);
    })
    .catch(err => {
      return res.status(503).send("data base error");
    })
});

router.post('/', function (req, res) {
  req.body.owner = req.body.userId;
  const newEvent = new Event(req.body);
  newEvent.save()
    .then((data) => {
      getEvents()
        .then(data => {
          if (data) {
            return res.status(200).json(data);
          }
        })
        .catch(err => {
          return res.status(503).send("data base error");
        });
    })
    .catch((err) => {
      console.log(err);

      return res.status(503).send('data base error');
    })
});

router.put('/:id', function (req, res) {
  Event.findByIdAndUpdate(req.body._id, req.body, { useFindAndModify: false })
    .then((data) => {
      getEvents()
        .then(data => {
          if (data)
            return res.status(200).json(data);
        })
        .catch((err) => {
          return res.status(503).send("data base error");
        })
    }).catch((err) => {
      return res.status(503).send("data base error");
    })
});

router.delete('/:id', function (req, res) {
  Event.findByIdAndDelete(req.body._id)
    .then((data) => {
      getEvents()
        .then(data => {
          if (data)
            return res.status(200).json(data);
        })
        .catch((err) => {
          return res.status(503).send("data base error");
        })
    }).catch((err) => {
      return res.status(503).send("data base error");
    })
});
module.exports = router;
