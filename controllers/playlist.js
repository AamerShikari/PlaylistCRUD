const Playlist = require('../models/playlist')
const Song = require('../models/song')

module.exports ={
    index,
    add,
    new: newPlaylist,
    show,
    delete: deletePlaylist,
    addSong,
    removeSong
}

function index (req, res) {
    Playlist.find({}, function(err, playlists){
        res.render('playlist/all', {playlists: playlists, user: req.user})
    });
}

function add (req, res) {
    res.render('playlist/add', {user: req.user})
}

function newPlaylist (req, res){
    req.body.title = req.body.title.trim()

    const playlist = new Playlist(req.body)
    playlist.save(function(err){
        res.redirect('/playlist/allPlaylists')
    })
}

function show (req, res) {
    Playlist.findOne({_id: req.params.id}).populate('songs').populate('reviews').exec(function(err, playlist){
        Song.find({_id: {$nin: playlist.songs}}, function(err, songs){
            res.render('playlist/show', {playlist: playlist, songs: songs, user: req.user})
        })
    })
}

function deletePlaylist (req, res) {
    Playlist.findOneAndDelete({_id: req.params.id}, function(err) {
        res.redirect('/playlist/allPlaylists')
    })
}

function addSong (req, res) {
    Playlist.findOne({_id: req.params.id}, function(err, playlist) {
        playlist.songs.push(req.body.songId)
        playlist.save(function(err){
            res.redirect(`/playlist/${playlist._id}`)
        })
    })
}

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