const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage} = require('./utils/message');
const publicPath = path.join(__dirname,'../public');
var port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

console.log(__dirname+'/../public');
console.log(publicPath);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('new user connected');

    // socket.emit('newMessage', {
    //     from: 'John',
    //     text: 'Hey. What is going on?',
    //     createdAt: 123123
    // });
    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));

    socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'));

    socket.on('createMessage', (message, callback) => {
        console.log('createMessage', message);
        io.emit('newMessage', generateMessage(message.from, message.text));
        if(callback)
            callback('This is from the server');
        // socket.broadcast.emit('newMessage', { // sends to every else
        //     from: message.from,
        //     text: message.text,
        //     createdAt: new Date().getTime()
        // });
    });

    socket.on('disconnect', () => {
        console.log('User was disconnected');
    });
});

server.listen(port, () => {
    console.log(`Server @ port ${port}`);
});

