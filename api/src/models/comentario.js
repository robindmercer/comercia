const { DataTypes, Sequelize } = require("sequelize");

module.exports = (sequelize) => {
   sequelize.define(
      "comentario",
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
         texto: { type: DataTypes.TEXT, allowNull: false },
         usuario: { type: DataTypes.STRING, allowNull: false },
         fecha: { type: DataTypes.STRING, allowNull: false },
      },
      { freezeTableName: true, timestamps: false }
   );
};


