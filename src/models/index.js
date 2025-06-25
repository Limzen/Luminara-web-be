const User = require('./User');
const Directory = require('./Directory');
const DirectoryRating = require('./DirectoryRating');
const Itinerary = require('./Itinerary');

// Set up associations
Directory.hasOne(DirectoryRating, { foreignKey: 'directory_id', as: 'rating' });
DirectoryRating.belongsTo(Directory, { foreignKey: 'directory_id', as: 'directory' });

User.hasMany(Itinerary, { foreignKey: 'user_id', as: 'itineraries' });
Itinerary.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

module.exports = {
  User,
  Directory,
  DirectoryRating,
  Itinerary
};