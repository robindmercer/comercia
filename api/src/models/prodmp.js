/*
  Tabla de Productos 
*/
const { DataTypes, Sequelize } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('prodmp', {
        prod_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        mp_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        cantidad: {
            type: DataTypes.NUMERIC,
            allowNull: false,
        },
    },
        { freezeTableName: true,
            timestamps: false }
    );
}
