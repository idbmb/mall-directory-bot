'use strict';
let model= require('../models')
const fs = require('fs');
let brandsStr = fs.readFileSync('data/brands.json').toString();
let brandsJson=JSON.parse(brandsStr);
module.exports = {
  up: function (queryInterface, Sequelize) {
      return new Promise (function(res,rej){
        let promises=[];
        for (var i = 0; i < brandsJson.length; i++) {
          promises.push(
            new Promise(function(resolve,reject){
              model.Brand.create({
                id: brandsJson[i].id,
                name: brandsJson[i].name,
                logo: brandsJson[i].logo,
                description: brandsJson[i].description,
                publish:brandsJson[i].publish

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
          res();
        })
        .catch(function(){
          rej()
        })
      })
  },

  down: function (queryInterface, Sequelize) {
   return queryInterface.bulkDelete('Brands', null, {});
  }
};
