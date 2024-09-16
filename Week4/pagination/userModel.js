const { sequelize } = require("./db");
const { DataTypes } = require("sequelize");

const User = sequelize.define(
  "User",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    timestamps: false, // Disable automatic 'createdAt' and 'updatedAt' fields
  }
);

module.exports = User;
