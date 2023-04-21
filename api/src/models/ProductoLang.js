/*
  Tabla de Productos 
*/
const { DataTypes, Sequelize } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('productolang', {
        id:{
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
        },
        lang: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },        
        description: {       
            type: DataTypes.STRING(1000),
            allowNull: false,
        },             
    },
        { freezeTableName: true, timestamps: false }
    );
}
