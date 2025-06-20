const { DataTypes } = require('sequelize');
const sequelize = require('../db/sequelize');
const Directory = sequelize.define('Directory', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  address: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  overall_rating: {
    type: DataTypes.DECIMAL(2, 1),
    allowNull: true
  },
  opening_hours: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  main_image_url: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  tableName: 'directories',
  timestamps: false
});

module.exports = Directory; 