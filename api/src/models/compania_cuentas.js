/*
ver que dice el gordo sobre este tema de tener 
cuentas diferentes para cada cuenta 
*/
const { DataTypes, Sequelize } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('compania_cuentas', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        cia_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        nacional: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        extranjero: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        nacionaling: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        extranjeroing: {
            type: DataTypes.TEXT,
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

