const { DataTypes, Sequelize } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('cliente', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        razsoc: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        apellido: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },        
        movil: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        fijo: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        rfc_cod: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        idioma: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        moneda: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        cod_cliente: {
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
};

