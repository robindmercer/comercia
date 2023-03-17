const { DataTypes, Sequelize } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('menu', {
        id_menu: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        nivel: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        programa: {
            type: DataTypes.STRING,
            allowNull: false,
        },    },
        { timestamps: false }
      );
};