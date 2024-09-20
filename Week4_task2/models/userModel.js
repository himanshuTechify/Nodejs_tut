const { sequelize } = require("../db");
const { DataTypes } = require("sequelize");

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      unique: true,
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull : false
    },
    phone: {
      type: DataTypes.STRING,
    },
    address: {
      type: DataTypes.STRING,
    },
    role: { 
      type: DataTypes.ENUM("admin", "user"),
      defaultValue : "user"
    },
    resettoken: {
      type : DataTypes.STRING,
    },
    resettokenexpiry : {
      type : DataTypes.DATE
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue : true
    },
    is_deleted: {
      type: DataTypes.BOOLEAN,
      defaultValue : false
    },
    created_by : {
      type : DataTypes.INTEGER
    },
    updated_by : {
      type : DataTypes.INTEGER
    },
    created_at : {
      type : DataTypes.DATE,
      defaultValue : sequelize.NOW
    },
    updated_at : {
      type : DataTypes.DATE,
      defaultValue : sequelize.NOW
    }
  },
  {
    tableName: "users",
    timestamps: false,
  }
);

module.exports = User
