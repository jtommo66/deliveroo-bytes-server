require("dotenv").config();
const express = require("express");
const router = express.Router();
const fs = require("fs");
const crypto = require("crypto");

function readUsers() {
  const file = fs.readFileSync("./data/users.json");
  const data = JSON.parse(file);
  return data;
}

router.get("/", (req, res) => {
  const data = readUsers();
  res.json(data);
});

router.get("/:id", (req, res) => {
  const data = readUsers();
  const singleUser = data.find((user) => user.id === req.params.id);

  if (!singleUser) {
    res.status(404).send(`User ID ${req.params.id} not found!`);
    return;
  }
  res.json(singleUser);
});

module.exports = router;
