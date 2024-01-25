require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT;
const apiUrl = process.env.API_URL;
const cors = require("cors");
const giftRoutes = require("./routes/gifts");
const userRoutes = require("./routes/users");

app.use(cors());
app.use(express.json());
app.use("/images", express.static("./public/images"));

app.use("/gifts", giftRoutes);
app.use("/users", userRoutes);

app.listen(port, () => {
  console.log("Server running on " + apiUrl + port);
});
