const Playlist = require('../models/playlist')
const Song = require('../models/song')

module.exports ={
    index,
    add,
    new: newPlaylist,
    show,
    delete: deletePlaylist,
    addSong,
    removeSong,
    like
}

//Render all playlist page
function index (req, res) {
    Playlist.find({}, function(err, playlists){
        res.render('playlist/all', {playlists: playlists, user: req.user})
    });
}

//Render add playlist page
function add (req, res) {
    res.render('playlist/add', {user: req.user})
}

//Create a new playlist then redirect to all playlist page
function newPlaylist (req, res){
    req.body.title = req.body.title.trim()

    const playlist = new Playlist(req.body)
    playlist.save(function(err){
        res.redirect('/playlist/allPlaylists')
    })
}

//Render a particular playlist page
function show (req, res) {
    Playlist.findOne({_id: req.params.id}).populate('songs').populate('reviews').exec(function(err, playlist){
        Song.find({_id: {$nin: playlist.songs}}, function(err, songs){
            res.render('playlist/show', {playlist: playlist, songs: songs, user: req.user})
        })
    })
}

//Remove a playlist and redirect to all playlist page
function deletePlaylist (req, res) {
    Playlist.findOneAndDelete({_id: req.params.id}, function(err) {
        res.redirect('/playlist/allPlaylists')
    })
}

//Add a song to the playlist and redirect to that playlist's page
function addSong (req, res) {
    Playlist.findOne({_id: req.params.id}, function(err, playlist) {
        playlist.songs.push(req.body.songId)
        playlist.save(function(err){
            res.redirect(`/playlist/${playlist._id}`)
        })
    })
}

//Remove a song from the playlist and redirect to that playlist's page
function removeSong (req, res) {
    console.log(req.params.songId)
    Playlist.findById(req.params.id, function(err, playlist){
        let i = playlist.songs.findIndex(function(d){
            return d._id == req.params.songId
        })
        playlist.songs.splice(i, 1)
        console.log(playlist.songs)
        playlist.save(function(err, f){
            if (err){ console.log(err)}
            res.redirect(`/playlist/${req.params.id}`)
        })
    })
}

//Like the playlist and redirect to that playlist's page
function like (req, res) {
    Playlist.findById(req.params.id, function(err, playlist){
        playlist.likes = playlist.likes + 1
        playlist.save(function(err){
            res.redirect(`/playlist/${req.params.id}`)
        })
    })
}