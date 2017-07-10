var db = require('../models');

module.exports = function(app){

    app.get('/', function(req, res) {
        res.render('index'); //home page
    });

    app.get('/profile', function(req, res) {
        res.render('profile');
    });

    app.get('/blog', function(req, res) {
        res.render('blog');
    });

    app.get('/events', function(req, res) {
        res.render('events');
    });

    app.get('/newsletter', function(req, res) {
        res.render('newsletters');
    });

    app.get('/classifieds', function(req, res) {
        res.render('classified');
    });


}

