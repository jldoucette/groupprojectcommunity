var express = require('express');
var socket = require('socket.io');

// app setups
var app = express();
var server = app.listen(3000, function(){
    console.log('Listening to request on port 3000');
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
