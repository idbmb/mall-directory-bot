'use strict';
let model= require('../models')
const fs = require('fs');
let mallsStr = fs.readFileSync('data/malls.json').toString();
let mallsJson=JSON.parse(mallsStr);
module.exports = {
  up: function (queryInterface, Sequelize) {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:*/
      return new Promise (function(res,rej){
        let promises=[];
        for (var i = 0; i < mallsJson.length; i++) {
          promises.push(
            new Promise(function(resolve,reject){
              model.Mall.create({
                id:mallsJson[i].id,
                name: mallsJson[i].name,
                cover: mallsJson[i].cover,
                description: mallsJson[i].description,
                contact: mallsJson[i].contact,
                latitude: mallsJson[i].latitude,
                longitude: mallsJson[i].longitude,
                address: mallsJson[i].address,
                city_id: mallsJson[i].city_id,
                province_id: mallsJson[i].province_id
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
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:*/
      return queryInterface.bulkDelete('Malls', null, {});

  }
};
