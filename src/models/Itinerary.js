const { DataTypes } = require('sequelize');
const sequelize = require('../db/sequelize');

const Itinerary = sequelize.define('Itinerary', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    destinations: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    image_url: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    start_date: {
        type: DataTypes.DATE,
        allowNull: true
    },
    end_date: {
        type: DataTypes.DATE,
        allowNull: true
    }
}, {
    tableName: 'itineraries',
    timestamps: true, // Otomatis mengelola createdAt dan updatedAt
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

module.exports = Itinerary;