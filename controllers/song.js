const Song = require('../models/song')
const { google } = require('googleapis')

module.exports = {
    index,
    add,
    new: newSong,
    show,
    delete: deleteSong
}

function index (req, res) {
    Song.find({}, function (err, songs){
        res.render('song/all', {songs: songs});
    });
}

function add (req, res) {
    res.render('song/add')
}

function newSong (req, res){
    let search = req.body.name + " " + req.body.artist;
    google.youtube('v3').search.list({
        key: process.env.YOUTUBE_TOKEN,
        part: 'snippet',
        q: search,
        maxResults: 1, 
    }).then((response) => {
        const { data } = response;
        req.body.videoId = data.items[0].id.videoId
        console.log(req.body)
        const song = new Song(req.body)
        song.save(function(err){
            res.redirect('/song/allSongs')
        })
    }).catch((err) => console.log(err));
}


function show (req, res) {
    Song.findOne({_id: req.params.id}).populate('reviews').exec(function(err,song){
        res.render('song/show', {song: song})
    })
}

function deleteSong (req, res) {
    Song.findOneAndDelete({_id: req.params.id}, function (err){
        res.redirect('/song/allSongs')
    })
}