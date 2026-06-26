const { DataTypes, Sequelize } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('canal', {
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
        descripcion: {
            type: DataTypes.STRING,
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

