const mongoose = require('mongoose');
const NewsSchema = require('../schemas/news');

var News = mongoose.model('News',NewsSchema);

module.exports = News;