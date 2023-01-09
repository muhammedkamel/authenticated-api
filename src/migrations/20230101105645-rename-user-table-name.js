'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.renameTable('User', 'Users')
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.renameTable('Users', 'User')
  }
};
