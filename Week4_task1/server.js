const express = require("express");
const { sequelize, checkDBConnectivity } = require("./db");
const dotenv = require("dotenv");
const fileRoutes = require("./routes/fileRoute");
const File = require("./models/fileModel");

dotenv.config();

const app = express();
app.use(express.json());

(async () => {
  try {
    await checkDBConnectivity();
    await sequelize.sync();
    console.log("All models are synced");
  } catch (error) {
    console.error("Error syncing models", error);
  }
})();

app.use("/api/files", fileRoutes);

app.listen(6000, () => {
  console.log("server started");
});
