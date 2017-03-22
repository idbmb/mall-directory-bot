'use strict';
let model= require('../models')
const fs = require('fs');
let categoriesStr = fs.readFileSync('data/categories.json').toString();
let categoriesJson=JSON.parse(categoriesStr);
module.exports = {
  up: function (queryInterface, Sequelize) {
      return new Promise (function(res,rej){
        let promises=[];
        for (var i = 0; i < categoriesJson.length; i++) {
          promises.push(
            new Promise(function(resolve,reject){
              model.Categori.create({
                id: categoriesJson[i].id,
                name: categoriesJson[i].name,
                image: categoriesJson[i].image,
                publish: categoriesJson[i].publish
              })

              if (promises.length!=0) {
                resolve(categoriesJson[i])
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
   return queryInterface.bulkDelete('Cateoris', null, {});
  }
};
