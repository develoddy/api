const express = require('express');
const bodyParser = require('body-parser');
const apiRouter = require('./routes/api');
const path = require('path');

const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const { User, Comment } = require('./db');
const io = new Server(server);

var port = 3800;
server.listen(port, () => { console.log('[ SERVER ] => Servidor corriendo en http://localhost:3800');});

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

require('./db');


// UPLOAD Y RUTA.
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api', apiRouter);


// SOCKET IO

// ESCUCHA DETERMINADOS EVENTOS.
io.on("connection", function (socket) {
  console.log("Un cliente se ha conectado");
  // socket.emit("messages", messages);
 
  const emitUsers = async () => {
    const users = await User.findAll();
    socket.emit("loadUsers", users);
  }

  /*
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `name` varchar(255) DEFAULT NULL,
    `lastname` varchar(255) DEFAULT NULL,
    `username` varchar(255) DEFAULT NULL,
    `email` varchar(255) DEFAULT NULL,
    `password` varchar(255) DEFAULT NULL,
    `code` varchar(255) DEFAULT NULL,
    `is_active` tinyint(1) DEFAULT 0,
    `is_admin` tinyint(1) DEFAULT 0,
    `created_at` datetime DEFAULT NULL,
    `updated_at` datetime DEFAULT NULL,
  */

  emitUsers();

  socket.on('newuser', async data => {
    try {
      const user = await User.create(data);
      console.log(user);
    } catch (err) {
      console.log(err);
    }

    /*const newUser = new User({
      name: data.name,
      lastname: data.lastname,
      username: data.username,
      email: data.email,
      password: data.password,
      code: data.code,
      is_active: data.is_active,
      is_admin: data.is_admin,
      created_at: data.created_at,
      updated_at: data.updated_at
    });*/

    //console.log(newUser);

  });
});