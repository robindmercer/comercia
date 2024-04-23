/*
  Tabla de factdet 
*/
const { DataTypes, Sequelize } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('factdet', {
        fac_id:{
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,            
        },
        orden:{
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,            
        }, 
        prod_id:{
            type: DataTypes.INTEGER,
            allowNull: false,
        },        
        precio:{
            type: DataTypes.NUMERIC,
            allowNull: false,
        },
        cantidad:{
            type: DataTypes.NUMERIC,
            allowNull: false,
        },
        total:{
            type: DataTypes.NUMERIC,
            allowNull: false,
        },       
        descto:{
            type: DataTypes.NUMERIC,
            allowNull: false,
        },       
    },
        { freezeTableName: true,
            timestamps: false }
    );
}
