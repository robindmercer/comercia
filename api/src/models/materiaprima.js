/*
  Tabla de Productos 
*/
const { DataTypes, Sequelize } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('materiaprima', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true,
        },
        description: {                                  // 1 Activo 2-Inactivo no a la venta 
            type: DataTypes.STRING(1000),
            allowNull: false,
        },       
        udm: {                                       // Unidad de medida 
            type: DataTypes.STRING,
            allowNull: false,
        },
        stockmin:{
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        stock:{
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    },
        { freezeTableName: true,
          timestamps: false }
    );
}
