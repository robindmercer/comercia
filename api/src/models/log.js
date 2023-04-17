const { DataTypes, Sequelize } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('log', {
        fac_id: {
            type: DataTypes.INTEGER,
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
    }
    );
};

