const { DataTypes, Sequelize } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('ticket', {
        fac_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        alta: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        },        
        cierre: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        },
        usr: {
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