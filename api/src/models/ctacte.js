const { DataTypes, Sequelize } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('ctacte', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        cod_cliente: {
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
        { freezeTableName: true,
            timestamps: false }
    );
};

