var express = require("express");
var router = express.Router();
const multer = require("multer");
const mongoose = require("mongoose");
var Movie = require("../db/models/movie");

/* GET news listing. */
router.get("/", (req, res, next) => {
  Movie.find({}, (err, result) => {
    if (err) {
      console.debug("Hey Look! Error", err);
      res.json(err);
    } else {
      // console.log(res);
      res.json(result);
    }
  });
});

//Create new movie
router.post("/",(req, res, next) => {
  console.debug(req.body);
  const data = req.body;
//   const dateObj = new Date();
//   const month = dateObj.getUTCMonth() + 1; //months from 1-12
//   const day = dateObj.getUTCDate();
//   const year = dateObj.getUTCFullYear();
  const movie1 = new Movie({
    image: data.image,
    title:data.title,
    synopsis: data.synopsis,
    actor: data.actor,
    min: data.min

  
  });
  movie1.save((err, newInstance) => {
    if (err) {
      console.error("Hey look, Error!", err);
      res.json(err);
    } else {
      res.json(newInstance);
    }
  });
});

router.delete("/:id", (req, res, next) => {
  const id = req.params['id']
  console.log("Delete this news", id)
  console.debug("Movie to delete", id);
  Movie.findByIdAndDelete(id, (err, doc) => {
    if (err) {
      console.error("Hey look, Error!", err);
      res.json(err);
    } else {
      res.status(200).json(doc);
    }
  });
});

router.put("/", async (req, res, next) => {
  console.debug(req.body);
  const data = req.body;
  const id = data._id;
  delete data._id;
  console.debug(data);


  Movie.findByIdAndUpdate(id,data, (err,doc) => {
    if (err) {
      console.error("Hey look, Error!", err);
      res.json(err);
    } else {
      res.status(200).json(doc);
    }

  });
});

module.exports = router;
