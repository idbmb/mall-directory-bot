var express = require('express');
var router = express.Router();

let queris = require('../helper/queris')

var apiai = require('apiai');
var app = apiai("391e94e2d8634c8f8316b11a1360243a");

var _ = require('lodash')

router.get('/', function(req, res, next) {
  res.json({
    status: 'up'
  })
});

router.post('/webhook', function(req, res, next) {
  let store = req.body.result.parameters.toko
  let mall = req.body.result.parameters.mall
  if (req.body.result.action == 'store_at_mall') {

    console.log('running', req.body.result.parameters);
    // cek mall nya ada gak di DB
    queris.isExistMall(mall).then(function(exist){
      if (exist) {
        queris.storeAtMall(store, mall).then(function(stores){
          console.log('data : ', stores);
          var composeMessage = ''
          if (stores.length == 0) {
            composeMessage = `Sepengetahuan saya tidak ada ${store} di ${mall} ): \n`
            queris.storeAtMalls(store).then(function(stores){
              console.log('stores : ----- ', stores);
              if (stores.length == 0) {
                res.json({
                  speech: composeMessage,
                  displayText: composeMessage
                })
              } else {
                if (stores.length > 0) {
                  if (stores.length == 1) {
                    composeMessage += `\n \ntapi, ${stores[0].store_name} itu ada di mall ${stores[0].mall_name}, tepatnya di lantai ${stores[0].floor_name}`
                  } else {
                    composeMessage += `\n \ntapi, ${stores[0].store_name} itu ada di ${stores.length} mall yang saya ketahui  \n`
                    for (var i = 0; i < stores.length; i++) {
                      composeMessage += `${i + 1}. mall ${stores[i].mall_name} lantai ${stores[i].floor_name} \n`
                    }
                  }
                }
                res.json({
                  speech: composeMessage,
                  displayText: composeMessage
                })
              }
            })
          } else {
            // jika lebih dari satu toko
            if (stores.length > 1) {
              composeMessage = `Ada ${stores.length} ${store} di mall ${mall}, yaitu di lantai `
              for (var i = 0; i < stores.length; i++) {
                if (stores.length - i == 2) {
                  composeMessage += `${stores[i].floor_name} dan `
                } else if (stores.length - i == 1) {
                  composeMessage += `${stores[i].floor_name}`
                } else {
                  composeMessage += `${stores[i].floor_name}, `
                }
              }
            } else {
              // kalo cuma satu toko
              composeMessage = `${stores[0].store_name} di ${stores[0].mall_name} ada di lantai ${stores[0].floor_name}`
            }
            res.json({
              speech: composeMessage,
              displayText: composeMessage
            })
          }
        });
      } else {
        // kalo mall yang di cari belum ada di DB kita
        composeMessage = 'Hmmmmm.. maaf, "' + mall + '" mall belum ada di pengetahuan saya ): saya segera mencari tahunya (:'
        res.json({
          speech: composeMessage,
          displayText: composeMessage
        })
      }
    })
  }

  if (req.body.result.action == 'store_at_malls') {

    console.log('running', req.body.result.parameters);
    // cek mall nya ada gak di DB
        queris.storeAtMalls(store).then(function(stores){
          var composeMessage = ''
          // kalo gak ketemu
          if (stores.length == 0) {
            composeMessage = 'Hmmmmm.. maaf, "' + store + '" belum ada di pengetahuan saya ): saya segera mencari tahunya (:'
            res.json({
              speech: composeMessage,
              displayText: composeMessage
            })
          } else {
            // kalo ketemu
            if (stores.length > 0) {
              // kalo ketemu cuma satu
              if (stores.length == 1) {
                composeMessage = `Sepengetahuan saya, ${stores[0].store_name} itu ada di mall ${stores[0].mall_name}, tepatnya di lantai ${stores[0].floor_name}`
              }
              // kalo ketemu lebih dari satu
              if (stores.length > 1) {
                // dapetin mall uniq
                var uniqMall = _.uniqBy(stores, 'mall_name')
                composeMessage = `${stores[0].store_name} itu ada di ${uniqMall.length} mall sepengetahuan saya, yaitu di mall :  \n`
                // loop sebanya uniq mall
                for (var i = 0; i < uniqMall.length; i++) {
                  var storesAtAMall = _.filter(stores, ['mall_name', uniqMall[i].mall_name])
                  floorUnique = _.uniqBy(storesAtAMall, 'floor_name')
                  composeMessage += `- ${floorUnique[0].mall_name} lantai `
                  // loop lagi di tiap mall kalo ada lebih dari satu
                  for (var j = 0; j < floorUnique.length; j++) {
                    if (floorUnique.length - j == 2) {
                      composeMessage += `${floorUnique[j].floor_name} dan `
                    } else if (floorUnique.length - j == 1) {
                      composeMessage += `${floorUnique[j].floor_name} \n`
                    } else {
                      composeMessage += `${floorUnique[j].floor_name}, `
                    }
                  }
                }
              }
            }
            res.json({
              speech: composeMessage,
              displayText: composeMessage
            })
          }
        });

    }

// var request = app.textRequest('bca di aeon', {
//     sessionId: '<unique session id>'
// });
//
// request.on('response', function(response) {
//     console.log(response);
// });
//
// request.on('error', function(error) {
//     console.log(error);
// });
//
// request.end();


});

module.exports = router;
