const express = require("express");
const dotenv = require("dotenv");
const File = require('./models/fileModel');
const User = require('./models/userModel');
const userRoutes = require('./routes/userRoute');
const {checkDbConnectivity, sequelize} = require('./db');


const app = express();
dotenv.config();
app.use(express.json());

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.urlencoded({ extended: true }));

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


app.use('/api/user', userRoutes)

app.listen(process.env.PORT, () => {
  console.log("server has started");
});


