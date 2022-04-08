const Song = require('../models/song')

module.exports = {
    index,
    add,
    new: newSong,
}

function index (req, res) {
    Song.find({}, function (err, songs){
        res.render('song/all', {songs: songs});
    });
}

function add (req, res) {
    res.render('song/add')
}

function newSong (req, res) {
    const song = new Song(req.body)
    song.save(function(err){
        res.redirect('/song/allSongs')
    })
}