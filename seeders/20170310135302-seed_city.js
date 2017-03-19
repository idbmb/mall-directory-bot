'use strict';
let model= require('../models')
const fs = require('fs');
let citiesStr = fs.readFileSync('data/cities.json').toString();
let citiesJson = JSON.parse(citiesStr);
module.exports = {
  up: function (queryInterface, Sequelize) {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */return new Promise(function(res,rej){
      let promises=[];
      for (var i = 0; i < citiesJson.length; i++) {
        promises.push(
          new Promise(function(resolve,reject){
            model.City.create({id:citiesJson[i].id,name:citiesJson[i].name,province_id:citiesJson[i].province_id})
            if (promises.length!=0) {
              resolve('success')
            } else {
              reject()
            }
          })
        )
      }
    Promise.all(promises).then(function(){
      console.log('seed success');
      res()
    }).catch(function(){
      rej()
    })

  })
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
    return queryInterface.bulkDelete('Cities', null, {});
  }
};
