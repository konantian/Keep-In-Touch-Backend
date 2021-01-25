const express = require('express');
const http = require('http');
const app = express();

const server = http.createServer(app);
const io = require('socket.io')(server, {
  cors: {
    origin: '*',
  }
});

io.on('connection',socket => {
    console.log('new ws connection');
    

    socket.emit('message', 'welcome to notification');
    socket.broadcast.emit('message', 'A user has established the connection');

    socket.on('disconnect', () => {
    	io.emit('message', 'A user has disconnected');
    })

    socket.on('connect', (data) => {
        console.log(`${data} has connected`);
    })

    socket.on('follow', msg => {
		console.log('new follower');
		io.emit('follow', msg);
	})
});



const PORT = 5000 || process.env.PORT;

server.listen(PORT, () => console.log(`server running on port ${PORT}`));

