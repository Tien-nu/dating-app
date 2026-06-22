const mongoose = require('mongoose');
const { Schema } = mongoose;

const commentSchema = new Schema({
    body: {
        type: String,
        required: [true, 'Comment body is required.'],
        trim: true
    },
    article: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Article',
        required: [true, 'Comment must belong to an article.']
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;
