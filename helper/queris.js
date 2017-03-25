let model= require('../models')
var _ = require('lodash');
module.exports = {
//mencari city di profinsi tertentu
  cityOfProvince:function(provinceName){
   model.Province.findAll({
     where:{
       name:{
         ilike:`%${provinceName}%`
       }
     }
   }).then(function(provinces){
     provinces.forEach(function(province){
        province.getCities().then(function(cities){
        console.log(`kota yang ada di provinsi ${province.name} adalah :` );
          cities.forEach(function(city){
            console.log(city.name);
          })
        })
     })
   })
 },

//mencari provinsi dari Kota
provinceOfCity:function(cityName){
  model.City.findAll({
    where:{
      name:{
        $ilike:`%${cityName}%`
      }
    }
  }).then(function(cities){
      cities.forEach(function(city){
        model.Province.findOne({
          where:{
          id:city.province_id
          }
        }).then(function(province){
           console.log(`provinsi dari ${city.name} adalah ${province.name}`);
        })
      })
  })
},
//find all mall in city
mallInCity:function(cityName){
  model.City.findAll({
    where:{
      name:{
        $ilike:`%${cityName}%`
      }
    }
  }).then(function(cities){
     cities.forEach(function(city){
       city.getMalls().then(function(malls){
             console.log(`mall yang ada di ${city.name} :`);
          malls.forEach(function(mall){
            console.log(mall.name);
          })
       })
     })
  })
},
storeInMall:function(storeName){
   model.Store.findAll({
     where:{
       name:{
         $ilike:`%${storeName}%`
       }
     }
   }).then(function(stores){
      stores.forEach(function(store){
        console.log(store.name,store.floor_id);
      })
   })
},

storeAtMall: function(storeName, mallName){
  var result = ''
  return new Promise(function(res, rej){

    model.sequelize.query(`SELECT malls.name as mall_name,floors.name as floor_name,stores.name as store_name
      FROM public."Malls" malls left join public."Floors" floors ON (malls.id=floors.mall_id) left join public."Stores" stores ON (floors.id=stores.floor_id)
      where malls.name Ilike '%${mallName}%' and stores.name ILIKE '%${storeName}%' `
      ,{
        type: model.sequelize.QueryTypes.SELECT
      }).then(function(malls){

        // malls.forEach(function(mall){
        //   result += `${mall.store_name} di ${mall.mall_name} ada di lantai ${mall.floor_name} `;
        // })

        res(malls)
      })
  })

},

storeAtMalls:function(storeName){
  model.sequelize.query(`SELECT malls.name as mall_name,floors.name as floor_name,stores.name as store_name
                         FROM public."Malls" malls left join public."Floors" floors ON (malls.id=floors.mall_id) left join public."Stores" stores ON (floors.id=stores.floor_id)
                         where stores.name ILIKE '%${storeName}%' `
  ,{
    type: model.sequelize.QueryTypes.SELECT
  }).then(function(malls){
    console.log(`${malls[0].store_name}  itu ada di : `);
    malls.forEach(function(mall){
      console.log(`${mall.mall_name} lantai ${mall.floor_name} `);
    })

  })
},

storeInFloor: function(mallName,floorName){
  model.sequelize.query(`SELECT malls.name as mall_name,floors.name as floor_name,stores.name as store_name
                         FROM public."Malls" malls left join public."Floors" floors ON (malls.id=floors.mall_id) left join public."Stores" stores ON (floors.id=stores.floor_id)
                         where malls.name ILIKE '%${mallName}%' and floors.name ='${floorName}' `
  ,{
    type: model.sequelize.QueryTypes.SELECT
  }).then(function(stores){
    console.log(`di mall ${stores[0].mall_name} lantai ${stores[0].floor_name} ADA : `);
    stores.forEach(function(store){
      console.log(`${store.store_name} `);
    })

  })
},
isExistMall: function(mallName){
  return new Promise(function(res, rej){
    model.Mall.findAll({
      where:{
        name:{
          ilike:`%${mallName}%`
        }
      }
    }).then(function(malls){
      if (malls.length > 0) {
        res(true)
      } else {
        res(false)
      }
    })
  })

}


}
