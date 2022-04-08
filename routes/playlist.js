var router = require('express').Router();
const playlistController = require('../controllers/playlist')

//GET /playlist/allPlaylists
router.get('/allPlaylists', playlistController.index)
//GET /playlist/addPlaylist
router.get('/addPlaylist', playlistController.add)
//POST /playlist/create
router.post('/create', playlistController.new)
//GET /playlist/:id
router.get('/:id', playlistController.show)
//DELETE /playlist/:id
router.delete('/:id', playlistController.delete)

module.exports = router;