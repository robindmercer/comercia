const { DataTypes, Sequelize } = require("sequelize");

module.exports = (sequelize) => {
   sequelize.define(
      "contratos_plantillas",
      {
         id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
         },
         nombre: {
            type: DataTypes.STRING(200),
            allowNull: false, 
         },
         descripcion: {
            type: DataTypes.STRING(100),
            allowNull: false, 
         },
         contenido: {
            type: DataTypes.TEXT,
            allowNull: false,
         },
         moneda: {
            type: DataTypes.INTEGER,
            allowNull: false,
         },
         idioma: {
            type: DataTypes.INTEGER,
            allowNull: false,
         },
         tieneaval: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
         },
         cod_status: {
            type: DataTypes.INTEGER,
            allowNull: false,
         },
         fecha_creacion: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: Sequelize.NOW,
         },
      },
      { freezeTableName: true, timestamps: false }
   );
};
