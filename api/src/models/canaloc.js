const { DataTypes, Sequelize } = require('sequelize');
// Relacion entre Canales y las ordenes de Compra
module.exports = (sequelize) => {
    sequelize.define('canaloc', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        can_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        fac_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        dias: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },    
        usr_id: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        fecha: {                                 
          type: DataTypes.DATE,
          allowNull: false,
        },
    },
        { freezeTableName: true,
            timestamps: false }
    );
};

