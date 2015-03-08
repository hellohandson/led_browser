// initialize everything, web server, socket.io, filesystem, johnny-five
var app = require('http').createServer(handler)
  , io = require('socket.io').listen(app)
  , fs = require('fs')
  , five = require("johnny-five"),
  board,led,sensor,
  active = true;

board = new five.Board();

// on board ready
board.on("ready", function() {

  //led = new five.Led(13).strobe(1000);
  led = new five.Led(13);
});

app.listen(8888);


// handle web server
function handler (req, res) {
  fs.readFile('index.html',
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('error loading index.html');
    }

    res.writeHead(200);
    res.end(data);
  });
}


// on a socket connection
io.sockets.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
 
  // if led message received
  socket.on('led', function (data) {
    console.log(data);
     //if(board.isReady){    led.strobe(data.delay); } 
  });

  socket.on('active', function (data){
    active = data.status;
    console.log(data);
    if (active){
      led.on();
    } else {
      led.stop().off();
    }
  });

});