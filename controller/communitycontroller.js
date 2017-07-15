var db = require('../models');
var nodemailer = require('nodemailer');
var path = require("path");
var bcrypt = require("bcrypt");
var siteUsername;
var userLoggedIn=false;
var userEmailAddr;
const saltRounds = 10;
module.exports = function(app){

    app.get("/", function(req, res) {
        res.sendFile(path.join(__dirname + "/../views/index.html"));
      });

     app.get("/logout", function(req, res) {
       userLoggedIn=false;
       res.redirect("/");

      });

    app.get('/home', function(req, res) {
        res.render('home'); 
    });  

      app.get('/nologinerror', function(req, res) {
        res.render('nologinerror'); 
    });    

    app.get('/profile', function(req, res) {
 if (userLoggedIn) {
      db.profile.findOne({
        where: {
          user_name: siteUsername
        }
      }).then(function(data) {
        console.log(data);
          var hbsObject = {
        profiles: data
      };
       res.render("profile", hbsObject);
      });
    }
    else {
    console.log("failed if, no username");
    res.render("nologinerror");
     } 
    });


    app.post("/error", function(req, res) {
       res.redirect("/blog");
     });
  

    app.get('/blog', function(req, res) {
      if (userLoggedIn) {
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
    }
    else {
    console.log("failed if, no username");
    res.render("nologinerror");
     } 
    });

    app.get("/events", function(req, res) { 
      if (userLoggedIn) {
        db.Events.findAll({
          order: [['id', 'DESC']]
        }).then(function(data){
            var hbsObject = {
                events: data
            };
            console.log(hbsObject);
            res.render("events", hbsObject);
        });
      }
        else {
    console.log("failed if, no username");
    res.render("nologinerror");

     } 
    }); 

    app.get("/newsletters", function(req, res) {
      if (userLoggedIn) {
        db.Newsletters.findAll({
          order: [['id', 'DESC']]
        }).then(function(data){
            var hbsObject = {
                newsletters: data
            };
            console.log(hbsObject);
            res.render("newsletters", hbsObject);
        });
      }
          else {
    console.log("failed if, no username");
    res.render("nologinerror");
     } 

    });      

    app.get('/classifieds', function(req, res) {
        if (userLoggedIn) {
      db.Classifieds.findAll({
         order: ['id']
      }).then(function(data) {
          var hbsObject = {
        classified: data
      };
       res.render("classified", hbsObject);
      });
    }
        else {
    console.log("failed if, no username");
    res.render("nologinerror");

     } 
    });

    //Creates new newletter
    app.post('/newsletters', function(req, res){
        if (userLoggedIn) {
      db.Newsletters.create({
        post_title: req.body.title,
        post_body: req.body.body
      }).then(function(data){
        res.redirect("/newsletters");
      });
    }
        else {
    console.log("failed if, no username");
    res.render("nologinerror");
     } 
    });

    //creates new events
    app.post('/events', function(req, res){
       if (userLoggedIn) {
        db.Events.create({
            event_user: siteUsername,
            event_name: req.body.eventName,
            event_time: req.body.eventTime,
            event_date: req.body.eventDate,
            event_details: req.body.eventDetails,
            event_location: req.body.eventLocation
        }).then(function(data){
            res.redirect("/events");
        });
      }
             else {
    console.log("failed if, no username");
    res.render("nologinerror");
     } 
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
       if (userLoggedIn) {
        var hbsObject={
          username: siteUsername
        }
        res.render('chatroom',hbsObject); 
      }
               else {
    console.log("failed if, no username");
    res.render("nologinerror");
     } 
    });

    //Creates new blog posts
    app.post("/blog", function(req, res) {
       console.log(req.body);
       db.Blogs.create({
         user: siteUsername,
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
         user: siteUsername,
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
          id: req.body.itemid,
          user: siteUsername
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
          user:siteUsername
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
        console.log('siteUsername is '+siteUsername);
        
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
        replyTo: userEmailAddr,
        subject: 'Email message from Community Classifieds Buyer ('+siteUsername+') about ' + itemforsale ,
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
              user_name: req.body.user_id
        }}).then(project =>{
          if (project !=null){
              //project is the body of the object that is returned if the user exists
            bcrypt.compare(req.body.user_password, project.dataValues.user_password, function(err, matches) {
                if (err) {
                  console.log('Error while checking password');
                }
                else if (matches) {
                  console.log('The password matches!');
                  siteUsername=req.body.user_id;
                  db.profile.findOne({
                  where: {
                  user_name: siteUsername
                  }
                  }).then(function(data) {
                  userEmailAddr=data.user_email
                  console.log(userEmailAddr);
                  });
                  userLoggedIn=true;
                  res.json("true")
                }
                else if (!matches) {
                  userLoggedIn=false;
                  console.log('The password does NOT match!');
                }
              });
          }
          else {
            userLoggedIn=false;
            res.json("false");

          }
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
      console.log('redirecting');
          
     })
  })
})

}

    
  
 

