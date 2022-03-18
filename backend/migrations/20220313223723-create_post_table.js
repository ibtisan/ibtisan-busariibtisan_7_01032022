'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable('posts', { 
      id: {
        allowNull     : false ,
        autoIncrement : true ,
        primaryKey    : true,
        type          : Sequelize.INTEGER
      } ,
      content : {
        allowNull : false ,
        type      : Sequelize.TEXT 
      },
      file:{
        allowNull : true ,
        type      : Sequelize.STRING
      },

      usersId : {
        allowNull : false ,
        type      : Sequelize.INTEGER ,
        references : {
          model : {
            tableName : 'users'
          },
          onDelete : 'CASCADE' ,
          onUpdate : 'CASCADE' ,
          key : 'id'
        } 
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
    await queryInterface.dropTable('posts');
  }
};
