'use strict';
module.exports = function(sequelize, DataTypes) {
  var Categori = sequelize.define('Categori', {
    name: DataTypes.STRING,
    image: DataTypes.STRING,
    publish: DataTypes.BOOLEAN
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Categori;
};