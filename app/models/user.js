const mongoose = require('mongoose');
const UserSchema = require('../schemas/user');

var User = mongoose.model('User',UserSchema);

module.exports = User;