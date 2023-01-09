const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('authenticated_api', 'root', 'password', {
  host: 'localhost',
  dialect: 'mysql'
})

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