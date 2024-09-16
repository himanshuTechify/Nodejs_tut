const express = require("express");
const { checkDbConnectivity,sequelize } = require("./db");
const User = require('./userModel');


const app = express();

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

app.get('/users',async (req,res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const offset = (page-1)*limit;

    try {
        const users = await User.findAndCountAll({
            limit : limit,
            offset : offset
        })
        res.json({
            totalItems : users.count,
            currentPage : page,
            data : users.rows,
            totalPages : Math.ceil( users.count/limit)
        })
    } catch (error) {
        res.status(500).json({ error : "something went wrong"});
    }
})


app.listen( 6000, () => {
    console.log("server has started");
})