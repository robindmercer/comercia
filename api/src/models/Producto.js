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
        orden: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        id_interno: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        stock: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        image_url: {
            type: DataTypes.STRING(500),
            allowNull: true,
        },
        image_key: {
            type: DataTypes.STRING(200),
            allowNull: true,
        },
        image_mime: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        image_size: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
    },
        { timestamps: false }
    );
}
