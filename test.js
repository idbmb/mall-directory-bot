let model= require('./models')
const fs = require('fs');
let provinceStr = fs.readFileSync('./data/provinces.json').toString();
let provincesJson = JSON.parse(provinceStr);

console.log(provincesJson);
