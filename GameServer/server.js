"use strict";
var express = require('express');
var http = require('http');
var io = require('socket.io');
var app = express();
var httpSrv = http.createServer(app);
var socketSrv = io(httpSrv);
socketSrv.on('connection', function (socket) {
    console.log("Client connected: " + socket.client.id);
    socketSrv.emit("player-joined", socket.client.id);
    socket.on('position-changed', function (id, direction, jumping, moving, xPosition, yPosition) {
        console.log("User: " + id + " position changed: " + xPosition + "-" + yPosition);
        socketSrv.emit('position-changed', id, direction, jumping, moving, xPosition, yPosition);
    });
});
httpSrv.listen(3000, function () {
    console.log('listening on *:3000');
});
//# sourceMappingURL=server.js.map