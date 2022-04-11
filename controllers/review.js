const Review = require('../models/review')
const Song = require('../models/song')
const Playlist = require('../models/playlist')

module.exports = {
    addSong
}

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