var express = require('express');
var methodOverride = require('method-override');
var bodyParser = require('body-parser');
var socket = require('socket.io');

var app = express();
var PORT = process.env.PORT || 3001;
var db = require("./models");

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("./public"));

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// Override with POST having ?_method=DELETE
app.use(methodOverride("_method"));

// Set Handlebars.
var exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Routes
require("./controller/communitycontroller.js")(app);


// Syncing our sequelize models and then starting our express app
db.sequelize.sync({ force: false }).then(function() {
var server = app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });

    //socket set up
    var io = socket(server);
    //this is the server side connection, there needs to be a connection made in the front end too
    //the front end connection can be viewed under public/chat.js
    io.on('connection', function(socket){
        console.log("Made socket connection", socket.id);

        //listen for the message being sent from the client
        //when we receive 'chat' message from the client, fire a callback function to broadcast the data that is sent from client
        socket.on('chat', function(data){ //receiving data from client
            //sends the message out to all sockets out on the server
            io.sockets.emit('chat', data);
            console.log('server side data receives data and passes back to client: ' +data);
        });

        //listen for someone typing so that we can broadcast that to the other clients
        socket.on('typing', function(data){ 
            console.log('server side receiving typing event from the client and will return data to client to process');
            socket.broadcast.emit('typing', data);
        });
    });
});


module.exports = app;

