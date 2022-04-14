const User = require ('../models/user')

module.exports = {
    index
}

//Render Homepage
function index(req, res) {
    res.render('index', {
        user: req.user
    })
}