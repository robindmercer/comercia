const { DataTypes, Sequelize } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('inventario', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        codigo: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        ubicacion: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        equipo_donde_se_utiliza: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        stock_minimo: {
            type: DataTypes.NUMERIC,
            allowNull: false,
        },
        inventario: {
            type: DataTypes.NUMERIC,
            allowNull: false,
        },
        costo_unitario: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        valor_almacen: {
            type: DataTypes.NUMERIC,
            allowNull: false,
        },
        proveedor: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        tiempo_de_entrega: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        notas: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, 
    { freezeTableName: true,
        timestamps: false }
    );
};
