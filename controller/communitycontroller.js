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

    app.get("/newsletters", function(req, res) {
        db.Newsletters.findAll({}).then(function(data){
            var hbsObject = {
                newsletters: data
            };
            console.log(hbsObject);
            res.render("newsletters", hbsObject);
        })
    });      

    app.get('/classifieds', function(req, res) {
        res.render('classified');
    });

    app.post('/newsletters', function(req, res){
        db.Newsletters.create({
            post_title: req.body.title,
            post_body: req.body.body
        }).then(function(data){
            res.redirect("/newsletters");
        })
    });

}

