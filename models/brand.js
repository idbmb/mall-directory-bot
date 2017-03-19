'use strict';
module.exports = function(sequelize, DataTypes) {
  var Brand = sequelize.define('Brand', {
    name: DataTypes.STRING,
    logo: DataTypes.STRING,
    description: DataTypes.STRING,
    publish: DataTypes.BOOLEAN
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Brand;
};