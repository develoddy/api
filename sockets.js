exports.default = (io) => {
  io.on("connection", function (socket) {
    console.log('A user connected');

    socket.on('cliente:message', (message) => {
      console.log(message);
      io.emit('server:message', `${socket.id.substr(0, 2)} said ${message}`);
      
    });
    socket.on('disconnect', () => {
      console.log('a user disconnected!');
    });
  });
};