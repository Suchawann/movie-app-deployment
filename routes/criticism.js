var express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
var Criticism = require("../db/models/criticism");

// Get criticisms
router.get("/", (req, res, next) => {
  Criticism.find({}, (err, result) => {
    if (err) {
      console.debug("Hey Look! Error", err);
      res.json(err);
    } else {
      // console.log(res);
      res.json(result);
    }
  });
});

// Create criticism
router.post("/", (req, res, next) => {
  console.debug(req.body);
  const data = req.body;
  const dateObj = new Date();
  const month = dateObj.getUTCMonth() + 1; //months from 1-12
  const day = dateObj.getUTCDate();
  const year = dateObj.getUTCFullYear();
  const criticism1 = new Criticism({
    img    : data.img,
    title  : data.title,
    content: data.content,
    author : data.author,
    publicationDate : year + "/" + month + "/" + day,
  });
  criticism1.save((err, newInstance) => {
    if (err) {
      console.error("Hey look, Error!", err);
      res.json(err);
    } else {
      res.json(newInstance);
    }
  });
});

// Delete criticism
router.delete("/:id", (req, res, next) => {
  const id = req.params['id']
  console.log("Delete this news", id)
  console.debug("Movie to delete", id);
  Criticism.findByIdAndDelete(id, (err, doc) => {
    if (err) {
      console.error("Hey look, Error!", err);
      res.json(err);
    } else {
      res.status(200).json(doc);
    }
  });
});

// Insert criticism
router.put("/", async (req, res, next) => {
  console.debug(req.body);
  const data = req.body;
  const id = data._id;
  delete data._id;
  console.debug(data);

  Criticism.findByIdAndUpdate(id,data, (err,doc) => {
    if (err) {
      console.error("Hey look, Error!", err);
      res.json(err);
    } else {
      res.status(200).json(doc);
    }

  });
});


module.exports = router;
