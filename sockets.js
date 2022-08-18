const { User } = require('./db');

// SOCKET IO
exports.default = async ( io ) => {

    // Escucha determinados eventos.
    io.on("connection", function (socket) {
        console.log("Un cliente se ha conectado, socket del backend y te envio estos datos");
        
        const emitUsers = async () => {
            const users = await User.findAll();
            socket.emit("loadUsers", users);
        }
    
        emitUsers();
        
        // Este evento recibe los datos que llega desde el front
        socket.on('newuser', async data => {
            console.log("Soy el socket del backend y me ha llegado estos datos: ");
            try {
            const user = await User.create(data);
            console.log(user);
            } catch (err) {
            console.log(err);
            }
        });
    
    });
};


