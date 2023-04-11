const { DataTypes, Sequelize } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('factcond', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        fac_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },        
        cond_id: {
            type: DataTypes.INTEGER,
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
        { freezeTableName: true, timestamps: false }
    );
};

