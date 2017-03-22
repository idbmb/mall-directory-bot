'use strict';
module.exports = function(sequelize, DataTypes) {
  var City = sequelize.define('City', {
    name: DataTypes.STRING,
    province_id: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        City.belongsTo(models.Province,{
          foreignKey: 'province_id'
        }),
        City.hasMany(models.Mall,{
          foreignKey: 'city_id'
        })
      }
    }
  });
  return City;
};
