const Review = require('../models/review')
const Song = require('../models/song')
const Playlist = require('../models/playlist')

module.exports = {
    addSong,
    addPlaylist
}

//Add a review to a particular song and then redirect to that song's page
function addSong (req, res){
    req.body.user = req.params.userName
    const review = new Review(req.body)
    Song.findById(req.params.id, function(err, song){
        song.reviews.push(review._id)
        song.save(function(err){
            review.save(function(err){
                res.redirect(`/song/${req.params.id}`)
            })
        })
    })
}

//Add a review to a particular playlist and then redirect to that playlist's page
function addPlaylist (req, res){
    req.body.user = req.params.userName
    const review = new Review(req.body)
    Playlist.findById(req.params.id, function(err, playlist){
        playlist.reviews.push(review._id)
        playlist.save(function(err){
            review.save(function(err){
                res.redirect(`/playlist/${req.params.id}`)
            })
        })
    })
}