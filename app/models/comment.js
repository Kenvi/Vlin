const mongoose = require('mongoose');
const CommentSchema = require('../schemas/comment');

var Comment = mongoose.model('Comment',CommentSchema);

module.exports = Comment;