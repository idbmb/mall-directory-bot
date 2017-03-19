let model= require('./models')
const fs = require('fs');
let provinceStr = fs.readFileSync('./data/provinces.json').toString();
let provincesJson = JSON.parse(provinceStr);

let citiesStr = fs.readFileSync('data/cities.json').toString();
let citiesJson = JSON.parse(citiesStr);

let floorStr = fs.readFileSync('data/floors.json').toString();
let floorJson=JSON.parse(floorStr);
//console.log(provincesJson);

//seed propince
//   let promises=[];
//   for (var i = 0; i < 1; i++) {
//     promises.push(
//       new Promise(function(resolve,reject){
//         model.Province.create({id:provincesJson[i].id,name:provincesJson[i].name})
//         if (promises!=0) {
//           resolve()
//         } else {
//           reject()
//         }
//       })
//     )
//   }
// Promise.all(promises).then(function(){
//   console.log('seed success');
// }).catch(function(err){
//   console.log(err);
// })

//seed floor_id
console.log(floorJson);
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

//console.log(citiesJson);
