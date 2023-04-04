/*
  Tabla de Productos 
*/
const { DataTypes, Sequelize } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('producto', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {                                  // 1 Activo 2-Inactivo no a la venta 
            type: DataTypes.STRING(1000),
            allowNull: false,
        },       
        price: {
            type: DataTypes.NUMERIC,
            allowNull: false,
        },
        dolar: {
            type: DataTypes.NUMERIC,
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
