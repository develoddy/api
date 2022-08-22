// exports.default = (io) => {
//   io.on("connection", function (socket) {
//     console.log('A user connected');

//     socket.on('cliente:message', (message) => {
//       console.log(message);
//       io.emit('server:message', `${socket.id.substr(0, 2)} said ${message}`);
      
//     });
//     socket.on('disconnect', () => {
//       console.log('a user disconnected!');
//     });
//   });
// };



// SOCKET IO


exports.default = async (io) => {
    // -- Controladores
    const { createComment , readComment } = require('./controllers/socket/commentHandler')(io);
    const { Comment, User, Profile } = require("./db");

    /**
     - -------------------------------------------------------------
     - Conexión de Socket.
     - Se inicializa la conexion del socket entre cliente y servidor
     - -------------------------------------------------------------
     */
    io.on("connection", function (socket) {

        console.log('A user connected');

        /**
         - ----------------------------------------------------------------
         - Llamadas al controlador.
         - Se receibe el nombre del evento que viene desde el cliente y se 
         - lo pasamos al controlador.
         - ----------------------------------------------------------------
         */

        socket.on("cliente:message", createComment);
        socket.on("cliente:readComment", readComment);


       

        /**
         - -------------------------------------------------------
         - Socket desconectando.
         - Cuando el usuario se sale de la pagina, automaticamente 
         - el socket se desconecta.
         - -------------------------------------------------------
         */

        socket.on('disconnect', () => {
            console.log('a user disconnected!');
        });
    });
};
