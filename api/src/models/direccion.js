const { DataTypes, Sequelize } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('direccion', {
        cli_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        orden: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        calle: {
            type: DataTypes.STRING,
            allowNull: false,
        },        
        localidad: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        cp: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        ciudad: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        pais: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        cod_tipo: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },    
        cod_status: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },    
    },
       { freezeTableName: true,
         timestamps: false }
    );
};

