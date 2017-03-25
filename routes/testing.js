'use strict';
var express = require('express');
var router = express.Router();

var util = require('util');
// var apiai = require("../module/apiai");
var apiai = require("apiai");

var options = {
    // hostname: 'eap.api.ai',
};

var app = apiai("391e94e2d8634c8f8316b11a1360243a", options);

var event = {
    name: "network.connect",
    data: {
        param1: "param1 value",
    }
};

var options = {
    sessionId: '<UNIQE SESSION ID>'
};

var request = app.eventRequest(event, options);

request.on('response', function(response) {
    console.log(util.inspect(response, false, null));
});

request.on('error', function(error) {
    console.log(error);
});

request.end();
