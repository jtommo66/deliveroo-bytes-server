require("dotenv").config();
const express = require("express");
const router = express.Router();
const fs = require("fs");

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

router.patch("/:id", (req, res) => {
  try {
    const data = readUsers();
    const singleUser = data.find((user) => user.id === req.params.id);

    if (!singleUser) {
      res.status(404).send("User not found");
    }
    const updatedData = data.filter((user) => user.id !== req.params.id);

    const updatedUser = {
      ...singleUser,
      address1: req.body.address1,
      address2: req.body.address2,
    };

    updatedData.push(updatedUser);
    const stringedUser = JSON.stringify(updatedData);
    fs.writeFileSync("./data/users.json", stringedUser);
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: "Unable to update address", error });
  }
});

module.exports = router;
