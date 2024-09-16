const express = require("express");
const { sequelize, checkDbConnectivity } = require("./db");
const authRoute = require("./routes/authroute");
require('dotenv').config();

const app = express();
app.use(express.json());

(async () => {
  await checkDbConnectivity();
})();

app.use("/api/v1/auth", authRoute);

app.listen(6000, () => {
  console.log("server has started");
});
