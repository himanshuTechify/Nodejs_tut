const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("task", "postgres", "123", {
  host: "localhost",
  dialect: "postgres",
  port: 5432,
  logging: false,
});

const checkDbConnectivity = async () =>{
   await sequelize.authenticate();
   console.log("database connect suceessfully")
}


module.exports = {sequelize,checkDbConnectivity}