const { DataTypes, Sequelize } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('canalgtos', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        fecha: {                                 
          type: DataTypes.DATE,
          allowNull: false,
        },
        codcanal: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },    
        presupuesto: {
            type: DataTypes.NUMERIC,
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

