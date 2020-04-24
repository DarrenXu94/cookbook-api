const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const RecipieSchema = new Schema({
    title: {
        type: String
    },
    author: {
        type: String
    },
    ingredients: {
        type: String
    },
    directions: {
        type: String
    },
    time: {
        type: Number
    },
    rating: {
        type: Number
    },
    cost: {
        type: Number
    },
    image: {
        type: String
    }
});

module.exports = Section = mongoose.model('recipies', RecipieSchema);
