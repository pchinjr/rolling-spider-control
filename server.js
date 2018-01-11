const express = require('express');
const app = express();
const server = require("http").createServer(app);
const io = require('socket.io')(server);
const port = 3000;
const temporal = 

server.listen(port);
console.log('Server listening at http://localhost:' + port);

app.use(express.static(__dirname + '/public'));
app.get('/', (req, res) => res.sendFile(__dirname + '/public/index.html'));

const RollingSpider = require('rolling-spider');
const rollingSpider = new RollingSpider();

rollingSpider.connect( function() {
    rollingSpider.setup( function () {
        rollingSpider.flatTrim();
        rollingSpider.startPing();
        rollingSpider.flatTrim();
        console.log('Connected to drone ', rollingSpider.name);
    })
})


//SocketIO connection handler and listening
io.on('connection', function (socket) {
  console.log("your socket id is ", socket.id);

  socket.on('take-off', function(data) {
    console.log('takeoff clicked');
    rollingSpider.takeOff();
  });

  socket.on('land', function(data) {
    console.log('land clicked');
    rollingSpider.land();
  });

  socket.on('disconnect', function() {
    console.log('browser closed');
  })
});