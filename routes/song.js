const router = require('express').Router()
const songController = require('../controllers/song')

//GET /song/allSongs
router.get('/allSongs', songController.index)
//GET /song/addSong
router.get('/addSong', songController.add)
//POST /song/create
router.post('/create', songController.new)
//GET /song/:id
router.get('/:id', songController.show)
//DELETE /song/:id
router.delete('/:id', songController.delete)
//POST /song/:id/liked
router.post('/:id/liked', songController.like)

module.exports = router