'use strict';
let model= require('../models')
const fs = require('fs');
let provinceStr = fs.readFileSync('data/provinces.json').toString();
let provincesJson = JSON.parse(provinceStr);
module.exports = {
  up: function (queryInterface, Sequelize) {

      return new Promise(function(res,rej){
        let promises=[];
        for (var i = 0; i < provincesJson.length; i++) {
          promises.push(
            new Promise(function(resolve,reject){
              model.Province.create({name:provincesJson[i].name})
              if (promises.length!=0) {
                resolve(provincesJson[i].name)
              } else {
                reject();
              }
            })
          )
        }
        Promise.all(promises).then(function(){
           console.log('insert success');
           res();
         }).catch(function(){
           rej();
         })

      })
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Province', null, {});

  }
};
