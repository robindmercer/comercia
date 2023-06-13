const { DataTypes, Sequelize } = require("sequelize");

module.exports = (sequelize) => {
   sequelize.define(
      "contrato",
      {
         id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
         },
         fac_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
         },
         nombre: { type: DataTypes.STRING, allowNull: false },
         rfc: { type: DataTypes.STRING, allowNull: false },
         claveelec: { type: DataTypes.STRING, allowNull: false },
         dircomp: { type: DataTypes.STRING, allowNull: false },
         moneda: { type: DataTypes.STRING, allowNull: false },
         importe: { type: DataTypes.STRING, allowNull: false },
         cedula: { type: DataTypes.STRING, allowNull: false },
         producto: { type: DataTypes.STRING, allowNull: false },
         serie: { type: DataTypes.STRING, allowNull: false },
         garantia: { type: DataTypes.STRING, allowNull: false },
         adicional: { type: DataTypes.TEXT, allowNull: false },
         fecha: { type: DataTypes.STRING, allowNull: false },
         terminado: { type: DataTypes.STRING, allowNull: false },
         especial: { type: DataTypes.STRING, allowNull: false },
         punitorio: { type: DataTypes.STRING, allowNull: false },
      },
      { freezeTableName: true, timestamps: false }
   );
};


