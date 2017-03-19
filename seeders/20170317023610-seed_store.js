'use strict';
let model= require('../models')
const fs = require('fs');
let storesStr = fs.readFileSync('data/stores.json').toString();
let storesJson=JSON.parse(storesStr);
module.exports = {
  up: function (queryInterface, Sequelize) {
    return new Promise (function(res,rej){
      let promises=[];
      for (var i = 0; i < storesJson.length; i++) {
        promises.push(
          new Promise(function(resolve,reject){
            model.Store.create({
              id:storesJson[i].id,
              name: storesJson[i].name,
              logo: storesJson[i].logo,
              phone: storesJson[i].phone,
              latitude: storesJson[i].latitude,
              longitude: storesJson[i].longitude,
              publish: storesJson[i].publish,
              floor_id: storesJson[i].floor_id,
              hit: storesJson[i].hit
            })

            if (promises.length!=0) {
              resolve(mallsJson[i])
            } else {
              reject()
            }

          })
        )
      }

      Promise.all(promises)
      .then(function(){
        console.log('seed success');
      })
      .catch()
    })
  },

  down: function (queryInterface, Sequelize) {

      return queryInterface.bulkDelete('Stores', null, {});
  }
};
