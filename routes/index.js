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
  // console.log('request : ', req.body);
  if (req.body.result.action == 'cari_toko_di_mall') {

    console.log('running', req.body.result.parameters);

    queris.isExistMall(req.body.result.parameters.mall).then(function(exist){
      console.log('is mall exist', exist);
      if (exist) {
        queris.storeAtMall(req.body.result.parameters.toko, req.body.result.parameters.mall).then(function(data){
          console.log('hasil : ', data);
          res.json({
            speech: data,
            displayText: data
          })
        });
      } else {
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
