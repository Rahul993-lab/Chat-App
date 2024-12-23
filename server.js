const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static('public'));

const users = {}; 
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('register user', (username) => {
    users[username] = socket.id;
    io.emit('active users', Object.keys(users)); 
    io.emit('user count', Object.keys(users).length); 
  });

  socket.on('chat message', ({ sender, message }) => {
    io.emit('chat message', { sender, message });
  });

  socket.on('disconnect', () => {
    const username = Object.keys(users).find((key) => users[key] === socket.id);
    if (username) delete users[username];

    io.emit('active users', Object.keys(users)); 
    io.emit('user count', Object.keys(users).length); 
  });
});

server.listen(4000, () => {
  console.log('Server listening on http://localhost:4000');
});
