require("dotenv").config();
const express = require("express");
const router = express.Router();
const fs = require("fs");
const crypto = require("crypto");

function readGifts() {
  const file = fs.readFileSync("./data/gifts.json");
  const data = JSON.parse(file);
  return data;
}

router.get("/", (req, res) => {
  const data = readGifts();
  res.json(data);
});

router.get("/:id", (req, res) => {
  const data = readGifts();
  const singleGift = data.find((gift) => gift.id === req.params.id);

  if (!singleGift) {
    res.status(404).send(`Gift ID ${req.params.id} not found!`);
    return;
  }
  res.json(singleGift);
});

module.exports = router;
