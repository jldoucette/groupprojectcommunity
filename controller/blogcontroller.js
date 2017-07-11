var db = require("../models");
var BlogId;
module.exports = function(app) {

  app.get("/", function(req, res) {

    db.Blogs.findAll({

       include: [db.Comments],
       order: [ 'id',
              [db.Comments, 'createdAt', 'DESC']]
    }).then(function(data) {
        var hbsObject = {
      Blog: data
    };
     res.render("blog", hbsObject);
    });
  });

  app.get("/classifieds", function(req, res) {

    db.Classifieds.findAll({
       order: ['id']
    }).then(function(data) {
        var hbsObject = {
      Classified: data
    };
     res.render("classified", hbsObject);
    });
  });

  app.post("/", function(req, res) {
    console.log(req.body);
    db.Blogs.create({
      user: req.body.user,
      blogtitle: req.body.blogtitle,
      blogpost: req.body.blogpost
    }).then(function(data) {
      res.redirect("/");
    });
  });

 app.post("/comment", function(req, res) {
    console.log(req.body);
    db.Comments.create({
      commentpost: req.body.comment,
      BlogId: req.body.currblogid,
      user:req.body.currbloguser
    }).then(function(data) {
      res.redirect("/");
    });
  });
