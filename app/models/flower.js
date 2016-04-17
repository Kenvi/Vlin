const mongoose = require('mongoose');
const FlowerSchema = require('../schemas/flower');

var Flower = mongoose.model('Flower',FlowerSchema);

module.exports = Flower;