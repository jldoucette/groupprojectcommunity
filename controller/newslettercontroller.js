var db = require('../models');

module.exports = function(app){

    app.post('/newsletters', function(req, res){
        db.Newsletters.create({
            post_title: req.body.title,
            post_body: req.body.body
        }).then(function(data){
            res.redirect("/newsletters");
        })
    });

}
