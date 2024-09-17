const {Sequelize} = require('sequelize')

const sequelize = new Sequelize("task", "postgres", "123", {
  host: "localhost",
  dialect: "postgres",
  port: 5432,
  logging: false,
});


const checkDBConnectivity = async () => {
    await sequelize.authenticate();
    console.log("database connected")
}

module.exports = {checkDBConnectivity,sequelize}