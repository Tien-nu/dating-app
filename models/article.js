const mongoose = require('mongoose');
const { Schema } = mongoose;

const articleSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Article title is required.'],
        minlength: [5, 'Title must be at least 5 characters.'],
        trim: true
    },
    author: {
        type: String,
        required: [true, 'Article author is required.'],
        trim: true
    },
    content: {
        type: String,
        required: [true, 'Article content is required.']
    },
    tags: {
        type: [String],
        default: []
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const Article = mongoose.model('Article', articleSchema);
module.exports = Article;
