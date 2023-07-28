/*
  Tabla de factura 
*/
const { DataTypes, Sequelize } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('factura', {
        cli_id:{
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        dir_id:{
            type: DataTypes.INTEGER,
            allowNull: false,
        },        
        dhl:{
            type: DataTypes.NUMERIC,
            allowNull: false,
        },
        subtotal:{
            type: DataTypes.NUMERIC,
            allowNull: false,
        },
        iva:{
            type: DataTypes.NUMERIC,
            allowNull: false,
        },
        total:{
            type: DataTypes.NUMERIC,
            allowNull: false,
        },
        observ:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        fecha: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        },  
        idioma: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        moneda: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },              
        cod_status: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
       
    },
        { timestamps: false }
    );
}
