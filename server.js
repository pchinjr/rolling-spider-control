var express = require('express');
var app = express();
var server = require("http").createServer(app);
var io = require('socket.io')(server);
var port = 3000;

app.use(express.static(__dirname + '/public'));
app.get('/', function(req, res) {
        res.sendFile(__dirname + '/public/index.html');
});
server.listen(port);
console.log('Server listening at http://localhost:' + port);