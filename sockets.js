// - SOCKET IO



exports.default = async (io) => {

    const { Post, User, Follow, PostImage, Image, Profile, Comment } = require("./db");

    // - Comments
    //const { create, read, update, delete } = require('./controllers/socket/commentHandler')(io);

    // - Posts
    const { getPosts, createComment, deleteComment } = require('./controllers/socket/postsHandler')(io);

    const { read } = require('./controllers/socket/commentHandler')(io);

    /**
     - -------------------------------------------------------------
     - Conexión de Socket.
     - Se inicializa la conexion del socket entre cliente y servidor
     - -------------------------------------------------------------
     */
    io.on("connection", function ( socket ) {

        console.log('A user connected');

        /**
         - ----------------------------------------------------------------
         - Llamadas al controlador.
         - Se receibe el nombre del evento que viene desde el cliente y se 
         - lo pasamos al controlador.
         - ----------------------------------------------------------------
         */

            // - Posts controller.
            socket.on('cliente:post_getpost', getPosts);
            socket.on("cliente:post_createcomment", createComment);
            socket.on('cliente:post_deleteComment', deleteComment);

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
