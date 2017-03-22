'use strict';
module.exports = function(sequelize, DataTypes) {
  var Province = sequelize.define('Province', {
    name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
       Province.hasMany(models.City,{
         foreignKey: 'province_id'
       });
      }
    }
  });
  return Province;
};
