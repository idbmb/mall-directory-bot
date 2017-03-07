'use strict';
module.exports = function(sequelize, DataTypes) {
  var Floor = sequelize.define('Floor', {
    name: DataTypes.STRING,
    mall_id: DataTypes.INTEGER,
    publish: DataTypes.BOOLEAN,
    level: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Floor;
};