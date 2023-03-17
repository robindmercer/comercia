const { DataTypes, Sequelize } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('usuariomenu', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        usrid: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        nivel: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        accion: {  // A=ABM C=Consulta
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    { timestamps: false }
    );
};