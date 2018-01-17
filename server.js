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
let rollingSpider = new RollingSpider();
// let rollingSpider = new RollingSpider({uuid: process.env.UUID, logger: console.log});

io.on('connection', function (socket) {
    console.log("your socket id is ", socket.id);

    socket.on('connectDrone', function() {
        console.log('connect clicked');
        rollingSpider.connect( function() {
            rollingSpider.setup( function () {
                rollingSpider.flatTrim();
                rollingSpider.startPing();
                rollingSpider.flatTrim();
                console.log('Connected to drone ', rollingSpider.name);
                console.log(rollingSpider.status);
            })
        });
    })
    
    socket.on('takeOff', function() {
        console.log('takeOff clicked');
        rollingSpider.takeOff()
        rollingSpider.flatTrim()
        console.log(rollingSpider.status);
    });
    
    socket.on('land', function() {
        console.log('land clicked');
        console.log(rollingSpider.status);
        rollingSpider.land();
        console.log(rollingSpider.status);
    });
    
    socket.on('forward', function() {
        console.log('forward clicked');
        rollingSpider.forward({steps: 10});
    });
    
    socket.on('backward', function() {
        console.log('backward clicked');
        rollingSpider.backward({steps: 10});
    });
    
    socket.on('turnLeft', function() {
        console.log('turnLeft clicked');
        rollingSpider.turnLeft({steps: 10});
    });
    
    socket.on('turnRight', function() {
        console.log('turnRight clicked');
        rollingSpider.turnRight({steps: 10});
    });

    socket.on('disconnectDrone', function() {
        console.log('disconnect clicked');
        console.log(rollingSpider.status);
        rollingSpider.disconnect();
        console.log(rollingSpider.status);
    })
    
    socket.on('disconnect', function() {
        console.log('browser closed');
    })
});
