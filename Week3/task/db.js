const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("task", "postgres", "123", {
  host: "localhost",
  dialect: "postgres",
  port: 5432,
  logging: false,
});

const checkDbConnectivity = async () => {
  await sequelize.authenticate();
  console.log("Database connected successfully.");
};


module.exports = { sequelize, checkDbConnectivity };
