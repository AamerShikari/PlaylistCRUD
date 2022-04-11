const mongoose = require('mongoose')
const Schema = mongoose.Schema

const reviewSchema = new mongoose.Schema({
    user: String,
    content: String,
},{
    timestamps: true
});

module.exports = mongoose.model('Review', reviewSchema);