const express = require('express');
const apiRouter = require('./routes/api');
const app = express();
const httpServer = require('http').createServer(app);
const io = require('socket.io')(httpServer, { cors: {origin : '*'} });

var port = 3800;
httpServer.listen(port, () => { console.log('SERVIDOR CORRIENDO EN: http://localhost:3800'); });

require('./sockets');

// DATABASE
require('./db');

// APP
require('./app').default(app);

// API REST
app.use('/api', apiRouter);

// const onConnection = (socket) => {
//   socket.on("cliente:message", createComment);
//   socket.on("comment:read", readComment);
// }

// io.on("connection", onConnection);

// SOCKET
require('./sockets').default(io);