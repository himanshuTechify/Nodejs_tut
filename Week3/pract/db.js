const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("test", "postgres", "123", {
  host: "localhost",
  dialect: "postgres",
  port: 5432,
  logging: false,
});

const checkDbConnectivity = async () => {
  await sequelize.authenticate();
  console.log("Connection has been established successfully.");
};

module.exports = { sequelize, checkDbConnectivity };
