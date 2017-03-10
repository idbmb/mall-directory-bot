let model= require('./models')
const fs = require('fs');
let provinceStr = fs.readFileSync('./data/provinces.json').toString();
let provincesJson = JSON.parse(provinceStr);

let citiesStr = fs.readFileSync('data/cities.json').toString();
let citiesJson = JSON.parse(citiesStr);

//console.log(provincesJson);
new Promise(function(res,rej){
  let promises=[];
  for (var i = 0; i < citiesJson.length; i++) {
    promises.push(
      new Promise(function(resolve,reject){
        model.City.create({id:citiesJson[i].id,name:citiesJson[i].name,province_id:citiesJson[i].province_id})
        if (promises.length!=0) {
          resolve(citiesJson[i])
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

console.log(citiesJson);
