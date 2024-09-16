const { DataTypes } = require("sequelize");
const { sequelize } = require("../db");

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement : true,
      primaryKey: true,
    },
    uuid : {
      type : DataTypes.UUID,
      defaultValue : DataTypes.UUIDV4,
      unique : true
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    last_name: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING,
      unique: true
    },
    password: {
      type: DataTypes.STRING
    },
    phone: {
      type: DataTypes.STRING
    },
    address: {
      type: DataTypes.STRING,
    },
    role: {
      type: DataTypes.ENUM("admin", "user")
    },
    isActive : {
      type : DataTypes.STRING
    }
  },
  {
    tableName: "users",
    timestamps: true,
  }
);

module.exports = User;
