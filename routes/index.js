var express = require('express');
var router = express.Router();

let queris = require('../helper/queris')

var apiai = require('apiai');
var app = apiai("391e94e2d8634c8f8316b11a1360243a");

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
            composeMessage = `Sepengetahuan saya tidak ada ${store} di ${mall} ):`
            queris.storeAtMalls(store).then(function(stores){
              if (stores.length == 0) {
                res.json({
                  speech: composeMessage,
                  displayText: composeMessage
                })
              } else {
                if (stores.length > 1) {
                  composeMessage = `${stores[0].store_name} itu ada di ${stores.length} mall yang saya ketahui  \n`
                  for (var i = 0; i < stores.length; i++) {
                    composeMessage += `${i + 1}. mall ${stores[i].mall_name} lantai ${stores[i].floor_name} \n`
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
        composeMessage = 'Hmmmmm.. maaf, ' + mall + ' mall belum ada di pengetahuan saya ): saya segera mencari tahunya (:'
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
          if (stores.length == 0) {
            composeMessage = 'Hmmmmm.. maaf, ' + store + ' belum ada di pengetahuan saya ): saya segera mencari tahunya (:'
            res.json({
              speech: composeMessage,
              displayText: composeMessage
            })
          } else {
            if (stores.length > 1) {
              composeMessage = `${stores[0].store_name} itu ada di ${stores.length} mall yang saya ketahui  \n`
              for (var i = 0; i < stores.length; i++) {
                composeMessage += `${i + 1}. mall ${stores[i].mall_name} lantai ${stores[i].floor_name} \n`
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
