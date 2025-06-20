const { DataTypes } = require('sequelize');
const sequelize = require('../db/sequelize');

const Article = sequelize.define('Article', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  short_desc: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  full_desc: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  image_url: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  tableName: 'articles',
  timestamps: false
});

module.exports = Article; 