/*
  Tabla de compra 
*/
const { DataTypes, Sequelize } = require("sequelize");

module.exports = (sequelize) => {
   const servicio = sequelize.define(
      "compradet",
      {
         id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,            
            primaryKey: true,
         },
         compraid: {
            type: DataTypes.INTEGER,
            allowNull: false,
         },
         name: {
            type: DataTypes.STRING,
            allowNull: false,
         },
         anterior: {
            type: DataTypes.NUMERIC,
            allowNull: false,
         },
         nuevo: {
            type: DataTypes.NUMERIC,
            allowNull: false,
         },
         cod_status: {
            type: DataTypes.INTEGER,
         },
      },
      { timestamps: false, freezeTableName: true }
   );
};
