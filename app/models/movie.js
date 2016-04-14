const mongoose = require('mongoose');
const MovieSchema = require('../schemas/movie');

var Movie = mongoose.model('Movie',MovieSchema);

module.exports = Movie;