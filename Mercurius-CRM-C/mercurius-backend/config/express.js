// Invoke 'strict' JavaScript mode
'use strict';

// Load the module dependencie
const config = require('./utils');
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const methodOverride = require('method-override');
var session = require('express-session');



// Define the Express configuration method
module.exports = function() {
	// Create a new Express application instance
	var app = express();

	app.use(cors());
	app.use(session({
    	secret: 'a4f8071f-c873-4447-8ee2'}));
	// Use the 'NDOE_ENV' variable to activate the 'morgan' logger or 'compress'
	// middleware
	if (config.useMorgan) {
		app.use(morgan('dev'));
	}

	// Use the 'body-parser' and 'method-override' middleware functions
	app.use(bodyParser.urlencoded({
		extended : true
	}));
	app.use(bodyParser.json());
	app.use(methodOverride());



	// Set the application view engine and 'views' folder
	// app.set('views', './app/views');
	// app.set('view engine', 'html');

	require('../routes/mercuriusRoutes.js')(app);

	// Configure static file serving
	//app.use(express.static(path.join(__dirname, '../resources')));


	// Return the Express application instance
	return app;
};
