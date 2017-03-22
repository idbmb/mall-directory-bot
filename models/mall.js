'use strict';
module.exports = function(sequelize, DataTypes) {
  var Mall = sequelize.define('Mall', {
    name: DataTypes.STRING,
    cover: DataTypes.STRING,
    description: DataTypes.TEXT,
    contact: DataTypes.STRING,
    latitude: DataTypes.STRING,
    longitude: DataTypes.STRING,
    address: DataTypes.TEXT,
    city_id: DataTypes.STRING,
    province_id:DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Mall.belongsTo(models.City,{
          foreignKey:'city_id'
        }),
        Mall.belongsToMany(models.Store,{
          through:'Floor',
          foreignKey: 'mall_id'
        })
      }
    }
  });
  return Mall;
};
