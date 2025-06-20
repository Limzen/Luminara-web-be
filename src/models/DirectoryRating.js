const { DataTypes } = require('sequelize');
const Sequelize = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME || 'luminara',
  process.env.DB_USER || 'root',
  process.env.DB_PASSWORD || '',
  {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
    dialect: 'postgres',
    logging: (msg) => console.log('Sequelize:', msg),
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);

const DirectoryRating = sequelize.define('DirectoryRating', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  directory_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'directories',
      key: 'id'
    }
  },
  overall_rating: {
    type: DataTypes.DECIMAL(2, 1),
    allowNull: true
  },
  total_reviews: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  guide_rating: {
    type: DataTypes.DECIMAL(2, 1),
    allowNull: true
  },
  transportation_rating: {
    type: DataTypes.DECIMAL(2, 1),
    allowNull: true
  },
  value_for_money_rating: {
    type: DataTypes.DECIMAL(2, 1),
    allowNull: true
  },
  safety_rating: {
    type: DataTypes.DECIMAL(2, 1),
    allowNull: true
  }
}, {
  tableName: 'directory_ratings',
  timestamps: false
});

module.exports = DirectoryRating; 