const { DataTypes, Sequelize } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('perfilmenu', {
        id_perfilmenu: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        id_menu: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        nivel: {
            type: DataTypes.STRING,
            allowNull: false,
        },        
    },
    { timestamps: false }
    );
};