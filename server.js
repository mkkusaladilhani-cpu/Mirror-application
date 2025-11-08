const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http, { cors: { origin: '*' } });

io.on('connection', socket => {
    console.log('User connected: ' + socket.id);

    socket.on('offer', offer => socket.broadcast.emit('offer', offer));
    socket.on('answer', answer => socket.broadcast.emit('answer', answer));
    socket.on('ice-candidate', candidate => socket.broadcast.emit('ice-candidate', candidate));

    socket.on('disconnect', () => console.log('User disconnected: ' + socket.id));
});

http.listen(3000, () => console.log('Signaling server running on port 3000'));
