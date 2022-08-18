const express = require('express');
const apiRouter = require('./routes/api');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

var port = 3800;
server.listen(port, () => { console.log('SERVIDOR CORRIENDO EN: http://localhost:3800'); });

// DATABASE
require('./db');

// APP
require('./app').default(app);

// API
app.use('/api', apiRouter);

// SOCKET
require('./sockets').default(io);