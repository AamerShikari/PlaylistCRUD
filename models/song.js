const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const songSchema = new mongoose.Schema({
    name: String, 
    artist: String,
    videoId: String,
    likes: {
        type: Number,
        default: 0
    },
    reviews: [{type: Schema.Types.ObjectId, ref: 'Review'}]
})

module.exports = mongoose.model('Song', songSchema)