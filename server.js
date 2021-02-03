const express = require('express');
const http = require('http');
const cors = require('cors')
const app = express();

app.use(cors())

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

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server listening on port ${PORT}`));

