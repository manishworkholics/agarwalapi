const { Sequelize } = require('sequelize');

// Initialize Sequelize connection
const sequelize = new Sequelize(
  process.env.DB_NAME || 'u551930549_agarwaldb',  // Database name
  process.env.DB_USER || 'u551930549_userss',     // Database username
  process.env.DB_PASS || 'Pnwqk$S7w/P',           // Database password
  {
    host: '62.72.28.103',                         // Database host
    dialect: 'mysql',                             // Specify the dialect (MySQL in this case)
    logging: false                                // Disable logging (optional)
  }
);

// Test connection
sequelize.authenticate()
  .then(() => {
    console.log('Connected to the MySQL Database');
  })
  .catch(err => {
    console.error('Error connecting to the database:', err);
  });

// Export the sequelize instance
module.exports = sequelize;
