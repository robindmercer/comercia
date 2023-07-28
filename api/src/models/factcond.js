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
            type: DataTypes.DECIMAL,
            allowNull: false,
        },        
        enganche: {
            type: DataTypes.DECIMAL,
            allowNull: false,
        },
        meses: {
            type: DataTypes.DECIMAL,
            allowNull: false,
        },
        interes: {
            type: DataTypes.DECIMAL,
            allowNull: false,
        }
    },
        { freezeTableName: true, timestamps: false }
    );
};

