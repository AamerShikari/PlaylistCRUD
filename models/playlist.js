const mongoose = require('mongoose')
const Schema = mongoose.Schema

const playlistSchema = new mongoose.Schema({
    title: String,
    songs: [{type: Schema.Types.ObjectId, ref:'Song' }]
},{
    timestamps: true
});

module.exports = mongoose.model('Playlist', playlistSchema);