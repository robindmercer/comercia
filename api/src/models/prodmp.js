/*
  Tabla de prodmp 
*/
const { DataTypes, Sequelize } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('prodmp', {
        prod_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        mp_name: {
            type: DataTypes.STRING,
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
