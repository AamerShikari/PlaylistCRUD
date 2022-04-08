const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const songSchema = new mongoose.Schema({
    name: String, 
    artist: String,
})

module.exports = mongoose.model('Song', songSchema)