/*
  Tabla de compra 
*/
const { DataTypes, Sequelize } = require('sequelize');



module.exports = (sequelize) => {
    const servicio = sequelize.define('compra', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        fecha: {                                 
          type: DataTypes.DATE,
          allowNull: false,
        },   
        titulo: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        tipo: {    //1= producto terminado 2= Insumo                              
            type: DataTypes.INTEGER,
            allowNull: false,
        }, 
        cod_status: {
          type: DataTypes.INTEGER,
        },    
    },
        { timestamps: false,
            freezeTableName: true }
    );
}