const { DataTypes, Sequelize } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('usuario', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        usr_id: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },        
        cod_perfil: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        cod_status: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },    
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        cia_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },        
    },
        { timestamps: false }
    );
};

