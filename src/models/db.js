const { Sequelize } = require('sequelize')

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT
  }
);

const connect = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

const disconnect = async () => {
  try {
    await sequelize.close()
    console.log('Disconnected successfully.');

  } catch (error) {
    console.log('Failed to disconnect:', error);
  }
}

module.exports = {
  sequelize,
  connect,
  disconnect
}