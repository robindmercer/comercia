const { DataTypes, Sequelize } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('tabla', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
        },
        cod: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        valor: {
            type: DataTypes.NUMERIC,
            allowNull: false,
        },
        // si esta en S es porque el DSCTO que se otorgo necesita la autorizacion de Gerencia 
        control: {
            type: DataTypes.STRING,
            allowNull: false,
        },        
        cod_status: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }, 
    },
    { timestamps: false ,
        freezeTableName: true
      }

    );
};