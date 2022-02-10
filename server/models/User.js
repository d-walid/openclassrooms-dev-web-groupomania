'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.User.hasMany(models.Post);
      models.Post.hasMany(models.Like);
      models.Post.hasMany(models.Comment);
    }
  }
  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      default: false
    },
    avatar: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: './img/icons-groupomania/logo.png'
    },
    biography: {
      type: DataTypes.STRING(500),
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};