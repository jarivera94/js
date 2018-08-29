// Invoke 'strict' JavaScript mode
'use strict';
// Se añade lectura del archivo de variables de entorno
require('dotenv').config();
// Set the 'NODE_ENV' variable
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// Load the module dependencies
const express = require('./config/express');
const session = require('express-session');

// Create a new Express application instance
const app = express();
app.use(session({secret: 'm3RcuR1u5',resave: true,
    saveUninitialized: true}));

// Configure the Passport middleware

// Use the Express application instance to listen to the '3062' port
const port = 3062;
app.listen(port,'0.0.0.0');

// Log the server status to the console
console.log('Server running at http://localhost:'+port+'/');

// Use the module.exports property to expose our Express application instance for external usage
module.exports = app;
