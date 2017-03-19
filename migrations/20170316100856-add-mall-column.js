'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:*/
      return [
        queryInterface.addColumn(
          'Malls',
          'city_id',
           { type: Sequelize.STRING}),
        queryInterface.addColumn(
          'Malls',
          'province_id',
           { type: Sequelize.STRING, }
        )
      ];
  },

  down: function (queryInterface, Sequelize) {
    return [
      queryInterface.removeColumn(
        'Malls',
        'city_id'
       ),
      queryInterfacea.removeColumn(
        'Malls',
        'province_id'
      )
    ];
  }
};
