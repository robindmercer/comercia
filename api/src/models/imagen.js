const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('imagen', {
    name: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },
    tipo: {
      type: DataTypes.STRING(20)
    },
    url: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },
  }, {
    timestamps: false,    
  });
};