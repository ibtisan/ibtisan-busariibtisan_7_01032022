'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Comment , {foreignKey:'usersId' , sourceKey:'id'})
    }
  };
  User.init({
    email:{
      type    : DataTypes.STRING,
      unique  : {
        args    : true ,
        message : 'Adresse email déjà utilisé'
      }
    },
    username:{
      type    : DataTypes.STRING,
      unique  : {
        args    : true ,
        message : 'Username déjà utilisé'
      }
    },
    password: DataTypes.STRING,
    picture : DataTypes.STRING,
    isAdmin: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'users'
  });
  return User;
};