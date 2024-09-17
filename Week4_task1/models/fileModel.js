const {DataTypes} = require('sequelize')
const {sequelize} = require('../db')


const File =  sequelize.define('File',{
    filename : {
        type : DataTypes.STRING,
        allowNull : false
    },
    mimetype : {
        type : DataTypes.STRING,
        allowNull : false
    },
    size : {
        type : DataTypes.INTEGER,
        allowNull : false
    }
})

module.exports = File