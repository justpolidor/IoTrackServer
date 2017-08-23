var http = require('http');
var express = require('express');
var responseTime = require('response-time');
var errorHandler = require('errorhandler');
var logger = require('morgan');
var fs = require('fs');
var namespace = require('express-namespace');

var app = express();
app.set('view engine', 'jade');
app.set('views','./views');
app.locals.pretty = true;

var routes = require('./routes')(app);

http.createServer(app).listen(3000, function () {
    console.log('Server started\nListening on port:3000');
});


//qui per router
app.use(express.static('./public'));
app.use(express.static('./files'));
app.use(responseTime());
app.use(errorHandler());

