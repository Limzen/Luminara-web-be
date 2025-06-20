const Directory = require('./Directory');
const DirectoryRating = require('./DirectoryRating');
const sequelize = require('../db/sequelize');

// Set up associations
Directory.hasOne(DirectoryRating, {
  foreignKey: 'directory_id',
  as: 'rating'
});

DirectoryRating.belongsTo(Directory, {
  foreignKey: 'directory_id',
  as: 'directory'
});

// Export models
module.exports = {
  Directory,
  DirectoryRating
}; 