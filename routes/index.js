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
  if (req.body.result.action == 'cari_toko_di_mall') {

    console.log('running', req.body.result.parameters);
    // cek mall nya ada gak di DB
    queris.isExistMall(mall).then(function(exist){
      if (exist) {
        queris.storeAtMall(store, mall).then(function(malls){
          console.log('data : ', malls);
          var composeMessage = ''
          if (malls.length > 1) {
            composeMessage = `Ada ${malls.length} ${store} di mall ${mall}, yaitu di lantai `
            for (var i = 0; i < malls.length; i++) {
              if (malls.length - i == 2) {
                composeMessage += `${malls[i].floor_name} dan `
              } else if (malls.length - i == 1) {
                composeMessage += `${malls[i].floor_name}`

              } else {
                composeMessage += `${malls[i].floor_name}, `
              }
            }

          } else {
            composeMessage = `${malls[0].store_name} di ${malls[0].mall_name} ada di lantai ${malls[0].floor_name}`
          }
          res.json({
            speech: composeMessage,
            displayText: composeMessage
          })
        });
      } else {
        // kalo mall yang di cari belum ada di DB kita
        res.json({
          speech: 'Hmmmmm.. maaf, ' + req.body.result.parameters.mall + ' mall belum ada di database kami ): kami segera mencari tahunya (:',
          displayText: 'Hmmmmm.. maaf, ' + req.body.result.parameters.mall + ' mall belum ada di database kami ): kami segera mencari tahunya (:',
        })
      }
    })

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
