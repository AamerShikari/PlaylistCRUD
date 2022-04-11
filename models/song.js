const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const songSchema = new mongoose.Schema({
    name: String, 
    artist: String,
    reviews: [{type: Schema.Types.ObjectId, ref: 'Review'}]
})

module.exports = mongoose.model('Song', songSchema)