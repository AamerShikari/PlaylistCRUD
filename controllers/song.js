const Song = require('../models/song')
const { google } = require('googleapis')

module.exports = {
    index,
    add,
    new: newSong,
    show,
    delete: deleteSong,
    like
}

//Render all songs 
function index (req, res) {
    Song.find({}, function (err, songs){
        res.render('song/all', {songs: songs});
    });
}

//Render add song page
function add (req, res) {
    res.render('song/add')
}

//Add a song then redirect to all song's page
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

//Render a particular song's page
function show (req, res) {
    Song.findOne({_id: req.params.id}).populate('reviews').exec(function(err,song){
        res.render('song/show', {song: song})
    })
}

//Delete a song and redirect to all song's page
function deleteSong (req, res) {
    Song.findOneAndDelete({_id: req.params.id}, function (err){
        res.redirect('/song/allSongs')
    })
}

//Like a particular song and redirect to that song's page
function like (req, res) {
    Song.findById(req.params.id, function(err, song){
        song.likes = song.likes + 1
        song.save(function(err){
            res.redirect(`/song/${req.params.id}`)
        })
    })
}