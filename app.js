// 'use strict'

// var express = require('express');
// var bodyParser = require('body-parser');
// var app = express();
// require('./index');

// Cargar rutas
// const apiRouter = require('./routes/api');

// Carfar middlewares
// app.use( bodyParser.urlencoded( { extended: true } ) );
// app.use( bodyParser.json() );

// Cargar cors


// Cargar rutas
// app.use('/api', apiRouter);


// Exportar App
//module.exports = app;


const express = require('express');
const app = express();
const path = require('path');

app.use(express.static(path.join(__dirname, 'public')));
module.exports = app;