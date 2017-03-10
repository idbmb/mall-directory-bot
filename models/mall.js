'use strict';
module.exports = function(sequelize, DataTypes) {
  var Mall = sequelize.define('Mall', {
    name: DataTypes.STRING,
    cover: DataTypes.STRING,
    description: DataTypes.TEXT,
    contact: DataTypes.STRING,
    latitude: DataTypes.STRING,
    longitude: DataTypes.STRING,
    address: DataTypes.TEXT
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Mall.belongsTo(models.City,{
          foreignKey:'city_id'
        })
      }
    }
  });
  return Mall;
};
