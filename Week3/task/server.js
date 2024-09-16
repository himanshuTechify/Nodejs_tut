const express = require("express");
const dotenv = require("dotenv");
const {sequelize, checkDbConnectivity } = require("./db");
const User = require('./models/userModel')
const router = require('./routes/userRoutes')

const app = express();
dotenv.config();
app.use(express.json());


(async () => {
  try {
    await checkDbConnectivity();
    console.log("Connection has been established successfully.");
    await sequelize.sync();
    console.log("All models were synchronized successfully.");
  } catch (error) {
    console.error("Error syncing models:", error);
  }
})();


app.use('/api/v1/users', router)

app.listen(6000, () => {
  console.log("server has started");
});
