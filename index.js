const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const PORT = process.env.PORT || 5000;
const server = http.createServer(express);
const wss = new WebSocket.Server({server});

wss.on('connection', function connection(ws){
	ws.on('message', function incoming(data) {
		wss.clients.forEach(function each(client){
			if (client != ws && client.readState == WebSocket.OPEN){
				client.send("Welcome!");
			}
		})
	})
})

server.listen(PORT, function() {
	console.log(`Server is listening on port ${PORT}`);
})
