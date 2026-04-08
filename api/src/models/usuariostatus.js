const { DataTypes, Sequelize } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('usuariostatus', {
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
        tipo:{ // Cotizacion O.C.
            type: DataTypes.STRING,
            allowNull: false,
        },
        cod_status: {   // status del Cotizacion O.C.
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        accion: {  // A=ABM C=Consulta
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    { timestamps: false, 
       tableName: 'usuariostatus' }
    );
};