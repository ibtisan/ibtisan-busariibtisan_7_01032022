'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable('users', { 
      id: {
        allowNull     : false ,
        autoIncrement : true ,
        primaryKey    : true,
        type          : Sequelize.INTEGER
      },
      
      picture : {
        allowNull : true ,
        type      : Sequelize.STRING 
      },

      username: {
        allowNull: false,
        unique   : true ,
        type     : Sequelize.STRING
      },

      email: {
        allowNull: false,
        type: Sequelize.STRING,
        unique: true,
      },

      isAdmin:{
        allowNull : false ,
        type      : Sequelize.BOOLEAN,
      },

      password:{
        allowNull : false ,
        type      : Sequelize.STRING,
      },

      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
   
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      } 
      
    });
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable('users');
  }
};
