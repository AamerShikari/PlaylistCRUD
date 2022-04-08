const Playlist = require('../models/playlist')

module.exports ={
    index,
    add,
    new: newPlaylist,
    show,
    delete: deletePlaylist
}

function index (req, res) {
    Playlist.find({}, function(err, playlists){
        res.render('playlist/all', {playlists: playlists})
    });
}

function add (req, res) {
    res.render('playlist/add')
}

function newPlaylist (req, res){
    req.body.songs = req.body.songs.split(',');
    req.body.title = req.body.title.trim()
    for (let i = 0; i < req.body.songs.length; i++){
        req.body.songs[i] = req.body.songs[i].trim()
    }

    const playlist = new Playlist(req.body)
    playlist.save(function(err){
        res.redirect('/playlist/allPlaylists')
    })
}

function show (req, res) {
    Playlist.findOne({_id: req.params.id}, function(err, playlist){
        res.render('playlist/show', {playlist: playlist})
    })
}

function deletePlaylist (req, res) {
    Playlist.findOneAndDelete({_id: req.params.id}, function(err) {
        res.redirect('/playlist/allPlaylists')
    })
}