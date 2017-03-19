'use strict';
let model= require('../models')
const fs = require('fs');
let floorStr = fs.readFileSync('data/floors.json').toString();
let floorJson=JSON.parse(floorStr);
module.exports = {
  up: function (queryInterface, Sequelize) {
    return new Promise (function(res,rej){
      let promises=[];
      for (var i = 0; i < floorJson.length; i++) {
        promises.push(
          new Promise(function(resolve,reject){
            model.Floor.create({
              id:floorJson[i].id,
              name:floorJson[i].name,
              mall_id: floorJson[i].mall_id,
              publish: floorJson[i].publish,
              level: floorJson[i].level
            })

            if (promises.length!=0) {
              resolve(floorJson[i])
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
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:*/
      return queryInterface.bulkDelete('Floors', null, {});

  }
};
