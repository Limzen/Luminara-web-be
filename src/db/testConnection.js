const sequelize = require('./sequelize');

const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');
  
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

testConnection(); 