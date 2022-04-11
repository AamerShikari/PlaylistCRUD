const router = require('express').Router()
const reviewController = require('../controllers/review')

//POST /song/:id/:userName/songReview
router.post('/song/:id/:userName/songReview', reviewController.addSong)
//POST /playlist/:id/:userName/playlistReview
router.post('/playlist/:id/:userName/playlistReview', reviewController.addPlaylist)


module.exports = router