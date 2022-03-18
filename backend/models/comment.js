'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Comment.belongsTo(models.User , {foreignKey: 'usersId' , sourceKey: 'usersId'});
      Comment.belongsTo(models.Post , {foreignKey : 'postsId' , sourceKey: 'id'});
    }
  };
  Comment.init({
    content: DataTypes.STRING,
    usersId: DataTypes.INTEGER ,
    postsId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Comment',
    tableName: 'comments'
  });
  return Comment;
};