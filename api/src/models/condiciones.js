const { DataTypes, Sequelize } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('condiciones', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        descuento: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },        
        enganche: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        meses: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        interes: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    },
        { freezeTableName: true,timestamps: false }
    );
};

