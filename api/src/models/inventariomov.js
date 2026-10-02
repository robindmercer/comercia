const { DataTypes, Sequelize } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('inventariomov', {
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
        codigo: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        ubicacion: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        cod_or: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        ubicacion: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        entrada: {
            type: DataTypes.NUMERIC,
            allowNull: false,
        },
        salida: {
            type: DataTypes.NUMERIC,
            allowNull: false,
        },
        entregado: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        observaciones: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        serie: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, 
    { freezeTableName: true,
        timestamps: false }
    );
};
