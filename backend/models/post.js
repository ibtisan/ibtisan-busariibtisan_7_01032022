'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Post.belongsTo(models.User , {foreignKey: 'usersId' , sourceKey : 'id'});
      Post.hasMany(models.Comment , {foreignKey: 'postsId' , sourceKey : 'id'});
    }
  };
  Post.init({
    content: DataTypes.STRING ,
    file   : DataTypes.STRING ,
    usersId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Post',
    tableName: 'posts'
  });
  return Post;
};