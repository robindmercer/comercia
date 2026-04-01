const { DataTypes } = require('sequelize');
const sequelize = require('../db');

module.exports = (sequelize) => {
  sequelize.define('StatusWorkflow', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  status_actual: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'status_actual'
  },
  status_aprobado: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'status_aprobado'
  },
  status_rechazado: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'status_rechazado'
  },
  requiere_modificacion: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    field: 'requiere_modificacion'
  },
  descripcion: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  cod_status: {
    type: DataTypes.INTEGER,
    defaultValue: 1,
    field: 'cod_status'
  }
}, {
  tableName: 'status_workflow',
  timestamps: false,
  indexes: [
    {
      unique: true,
      fields: ['status_actual', 'requiere_modificacion']
    }
  ]
});
};