const mongoose = require('mongoose');

const resourceSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please add a title']
    },
    description: {
        type: String,
        required: [true, 'Please add a description']
    },
    url: {
        type: String,
        required: [true, 'Please add a resource URL']
    },
    category: {
        type: String,
        required: [true, 'Please specify a category']
    },
    imageUrl: {
        type: String,
        default: "https://placeholder.com/"
    },
    likes: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Resource', resourceSchema);