const { sequelize } = require("../db");
const { DataTypes } = require("sequelize");

const File = sequelize.define(
  "File",
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
    userId : {
        type : DataTypes.INTEGER,
        allowNull : false
    },
    filename : {
        type : DataTypes.STRING,
        allowNull : false
    },
    mimetype : {
        type : DataTypes.STRING,
        allowNull : false
    },
    filesize : {
        type : DataTypes.STRING,
        allowNull : false
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    is_deleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    created_by: {
      type: DataTypes.INTEGER,
    },
    updated_by: {
      type: DataTypes.INTEGER,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: sequelize.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: sequelize.NOW,
    },
  },
  {
    tableName: "files",
    timestamps: false,
  }
);

module.exports = File;
