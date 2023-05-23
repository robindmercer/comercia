/*
  Tabla de Productos 
*/
const { DataTypes, Sequelize } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('cotizacion', {
        cli_id:{                    // solo para saber a quien se le mando la cotizacion 
            type: DataTypes.INTEGER,// al inicio se graba en 0
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
        nombre:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        telefono:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        direccion:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        email:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        vendedor:{
            type: DataTypes.STRING,
            allowNull: false,
        },


    },
        { freezeTableName: true,timestamps: false }
    );
}
