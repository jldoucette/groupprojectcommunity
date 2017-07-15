
//Make socket connection with the server
// var socket = io.connect('https://localhost:3001');
var socket = io.connect();

//query DOM
var message = $('#message');
var handle = $('#handle');
var btn = $('#send');
var output = document.getElementById('output');
var feedback = document.getElementById('feedback');

//emit events
btn.on('click', function(event){
    event.preventDefault();
    socket.emit('chat', {           //sends the message over to the server with the 'chat' message and a callback function
        message: message.val(),
        handle: handle.val(),
    });
});



//listen for keypress events for broadcasting
message.on('keypress', function(){
    socket.emit('typing', handle.val()); //passes keypress event to the server
    console.log('client side passing typing event to the server');
});

//listen for events from the server for user output
socket.on('chat', function(data){
    console.log('data returned from server to client side: ' +data);
    feedback.innerHTML = ""; //so that broadcasted message disappears after its done
    output.innerHTML += '<p><strong>' +data.handle+ ': </strong>' +data.message+ '</p>';
});

//listen for events from the server for broadcasting message
socket.on('typing', function(data){
    feedback.innerHTML = '<p><em>' +data+ ' is typing a message..</em></p>';
});