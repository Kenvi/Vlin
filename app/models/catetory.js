/**
 * Created by Kenvi on 2016/4/2.
 */

const mongoose = require('mongoose');
const CatetorySchema = require('../schemas/catetory');

var Catetory = mongoose.model('Catetory',CatetorySchema);

module.exports = Catetory;