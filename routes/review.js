const router = require('express').Router()
const reviewController = require('../controllers/review')

//POST /song/:id/:userName/review
router.post('/song/:id/:userName/songReview', reviewController.addSong)


module.exports = router