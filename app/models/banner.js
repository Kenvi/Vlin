/**
 * Created by Kenvi on 2016/5/16.
 */

const mongoose = require('mongoose');
const BannerSchema = require('../schemas/banner');

var Banner = mongoose.model('Banner',BannerSchema);

module.exports = Banner;