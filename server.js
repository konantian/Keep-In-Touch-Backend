const express = require('express');
const http = require('http');
const app = express();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", '*');
    res.header("Access-Control-Allow-Credentials", true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
    next();
});

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

server.listen(PORT, () => console.log(`server running on port ${PORT}`));

