const router = require('express').Router()
const songController = require('../controllers/song')

//GET /song/allSongs
router.get('/allSongs', songController.index)
//GET /song/addSong
router.get('/addSong', songController.add)
//POST /song/create
router.post('/create', songController.new)

module.exports = router