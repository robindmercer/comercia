const { DataTypes, Sequelize } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('log', {
        doc_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        tipo_id: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        usr_id: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        cod_status: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        fecha: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        observ: {
            type: DataTypes.STRING,
            allowNull: false,
        },

    },
    { timestamps: false }
);
}