const mongoose = require('mongoose')
const Schema = mongoose.Schema

const playlistSchema = new mongoose.Schema({
    title: String,
    songs: [{type: Schema.Types.ObjectId, ref:'Song' }],
    reviews: [{type: Schema.Types.ObjectId, ref:'Review'}]
},{
    timestamps: true
});

module.exports = mongoose.model('Playlist', playlistSchema);