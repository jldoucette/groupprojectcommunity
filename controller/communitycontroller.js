var db = require('../models');
var nodemailer = require('nodemailer');

module.exports = function(app){

    app.get('/', function(req, res) {
        res.render('index'); //home page
    });

    app.get('/profile', function(req, res) {
        res.render('profile');
    });

    app.get('/blog', function(req, res) {
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
      db.Classifieds.findAll({
         order: ['id']
      }).then(function(data) {
          var hbsObject = {
        classified: data
      };
       res.render("classified", hbsObject);
      });
    });

    // app.post('/newsletters', function(req, res){
    //     db.Newsletters.create({
    //         post_title: req.body.title,
    //         post_body: req.body.body
    //     }).then(function(data){
    //         res.redirect("/newsletters");
    //     })
    // });

    app.post("/blog", function(req, res) {
       console.log(req.body);
       db.Blogs.create({
         user: req.body.user,
         blogtitle: req.body.blogtitle,
         blogpost: req.body.blogpost
       }).then(function(data) {
         res.redirect("/blog");
       });
     });

      app.post("/classifieds", function(req, res) {
       console.log(req.body);
       db.Classifieds.create({
         user: req.body.user,
         itemtitle: req.body.itemtitle,
         saleitem: req.body.saleitem,
         price: req.body.price
       }).then(function(data) {
         res.redirect("/classifieds");
       });
     });

     app.post("/comment", function(req, res) {
        console.log(req.body);
        db.Comments.create({
          commentpost: req.body.comment,
          BlogId: req.body.currblogid,
          user:req.body.currbloguser
        }).then(function(data) {
          res.redirect("/blog");
        });
      });

       app.post("/makeoffer", function(req, res) {
        console.log(req.body);
        var email=req.body.email;
        var itemforsale=req.body.itemforsale;
        var comment=req.body.comment;
        var price=req.body.price;
        console.log('email is '+email);
        console.log('itemforsale is '+itemforsale);
        console.log('comment is '+comment);
        console.log('price is '+price);
        
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
            user: 'TBD',
            pass: 'TBD'
            }
          });

        var mailOptions = {
        from: 'TBD',
        to: email,
        subject: 'Email message from Community Classifieds Buyer about ' + itemforsale ,
        text: 'Message from Community Classifieds Buyer about '+ itemforsale + '. This was listed by you at $'+ price +':  '+ comment
        };

        transporter.sendMail(mailOptions, function(error, info){
        if (error) {
        console.log(error);
        } else {
        console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!Email sent: ' + info.response);
        }
        });
          res.redirect("/classifieds");
          });

}
