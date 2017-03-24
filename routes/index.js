var express = require('express');
var router = express.Router();

let queris = require('../helper/queris')


router.get('/', function(req, res, next) {
  res.json({
    status: 'up'
  })
});

router.post('/webhook', function(req, res, next) {
  queris.storeAtMall(req.body.store, req.body.mall).then(function(data){
    res.json({
      result: data
    })
  });
});

module.exports = router;
