var db = require('../models');
var nodemailer = require('nodemailer');
var path = require("path");
var bcrypt = require("bcrypt");
const saltRounds = 10;
module.exports = function(app){

    app.get("/", function(req, res) {
        res.sendFile(path.join(__dirname + "/../views/index.html"));
      });

    app.get('/home', function(req, res) {
        res.render('home'); 
    });    

    app.get('/profile', function(req, res) {
        res.render('profile');
    });

    app.get('/blog', function(req, res) {
      db.Blogs.findAll({

         include: [db.Comments],
         order:
                [['createdAt','DESC'],
                [db.Comments, 'createdAt', 'DESC']]
      }).then(function(data) {
          var hbsObject = {
        Blog: data
      };
       res.render("blog", hbsObject);
      });
    });

    app.get("/events", function(req, res) {
        db.Events.findAll({
          order: [['id', 'DESC']]
        }).then(function(data){
            var hbsObject = {
                events: data
            };
            console.log(hbsObject);
            res.render("events", hbsObject);
        })
    }); 

    app.get("/newsletters", function(req, res) {
        db.Newsletters.findAll({
          order: [['id', 'DESC']]
        }).then(function(data){
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

    //Creates new newletter
    app.post('/newsletters', function(req, res){
      .3
      db.Newsletters.create({
        post_title: req.body.title,
        post_body: req.body.body
      }).then(function(data){
        res.redirect("/newsletters");
      })
    });

    //creates new events
    app.post('/events', function(req, res){
        db.Events.create({
            event_user: req.body.eventUser,
            event_name: req.body.eventName,
            event_time: req.body.eventTime,
            event_date: req.body.eventDate,
            event_details: req.body.eventDetails,
            event_location: req.body.eventLocation
        }).then(function(data){
            res.redirect("/events");
        })
    });

    //changes event to gone
    app.delete("/events/:id", function(req, res) {
      db.Events.destroy({
        where: {
          id: req.params.id
        }
      }).then(function(data) {
        res.redirect("/events");
      });
    });
  
    app.get('/chatroom', function(req, res) {
        res.render('chatroom'); 
    });

    //Creates new blog posts
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

    //Creates new classifieds post
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

    app.post('/newsletters/edit', function(req, res){
      db.Newsletters.update({
        post_title: req.body.title,
        post_body: req.body.body
      }, {
        where: {
          id: req.body.id
        }
      }).then(function(data){
        res.redirect('/newsletters');
      })
    });    

    //changes to sold
    app.post("/api/solditem", function(req, res) {
      db.Classifieds.update({
      sold: true},
        {where: {
          id: req.body.itemid
        }
      })
    .then(function(data) {
      res.redirect("/classifieds");
      });
    });

    //Comments on the Blog
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
            user: 'jldoucette.work@gmail.com',
            pass: 'Group7%rj'
            }
          });

        var mailOptions = {
          from: 'jldoucette.work@gmail.com',
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
        
  //login
    app.post("/login", function(req, res) {
          // console.log(req);
          db.profile.findOne({  where: {
              user_name: req.body.user_name
        }}).then(project =>{
              //project is the body of the object that is returned if the user exists
          bcrypt.compare(req.body.user_password, project.dataValues.user_password, function(err, matches) {
              if (err)
                console.log('Error while checking password');
              else if (matches)
                console.log('The password matches!');
              else
                console.log('The password does NOT match!');
            });
      });
  });

    //create new Users STILL NEED TO MAKE THE VALUES APPROPRIATE WITH TEXT BOX
    app.post("/newUser", function(req, res) {
      var AlteredPassword = req.body.userPassword;
      bcrypt.hash(AlteredPassword, saltRounds, function(err, hash) { //bcrypt encrypts the password
        db.profile.create({
            user_name: req.body.userName,
            user_age: req.body.userAge,
              user_email: req.body.userEmail,
              user_password: hash,
                user_bio: req.body.userBio,
          complete: req.body.complete
        }).then(function(dbTodo) {
            res.json(dbTodo);//to see if message is sent through
            // res.redirect("/"); //trying to redirect but not working
            //if successful pop up an account that says you are successful
            //if failed, pop up box says an account was not created
        });
        console.log(req);
      });
    });

}
