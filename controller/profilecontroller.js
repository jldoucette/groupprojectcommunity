// var db = require("../models");
// var bcrypt = require('bcrypt');
// const saltRounds = 10;

// module.exports = function(app) {


//   app.post("/login", function(req, res) {
//     // console.log(req);
//     db.profile.findOne({  where: {
//         user_name: req.body.user_name
//       }}).then(project =>{
//             //project is the body of the object that is returned if the user exists
//            bcrypt.compare(req.body.user_password, project.dataValues.user_password, function(err, matches) {
//               if (err)
//                 console.log('Error while checking password');
//               else if (matches)
//                 console.log('The password matches!');
//               else
//                 console.log('The password does NOT match!');
//             });


//       })


//   });


//   //create new Users STILL NEED TO MAKE THE VALUES APPROPRIATE WITH TEXT BOX


//   app.post("/newUser", function(req, res) {
//     var AlteredPassword = req.body.userPassword;
//      bcrypt.hash(AlteredPassword, saltRounds, function(err, hash) { //bcrypt encrypts the password
//       db.profile.create({
//           user_name: req.body.userName,
//           user_age: req.body.userAge,
//             user_email: req.body.userEmail,
//             user_password: hash,
//               user_bio: req.body.userBio,
//         complete: req.body.complete
//       }).then(function(dbTodo) {
//           res.json(dbTodo);//to see if message is sent through
//           // res.redirect("/"); //trying to redirect but not working
//           //if successful pop up an account that says you are successful
//           //if failed, pop up box says an account was not created
//       });
//       console.log(req);
//     });
//   })


// };
