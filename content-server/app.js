
/**
 * Module dependencies.
 */

var express = require('express')
    , cmsRouter = require('./cmsRouter')
    , apiRouter = require('./apiRouter')
    , db = require('./model')
    , fs = require('fs')
    , config = require('./config');

// Bootstrap and sync database
db.bootstrap();

/*
var app = module.exports = express.createServer({
    key: fs.readFileSync('ssl/private.key.pem'),
    cert: fs.readFileSync('ssl/combined.crt')
});
*/
var app = module.exports = express.createServer();

// Configuration
// Enable JSONP
app.enable("jsonp callback");

app.configure(function() {
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Routes

// API
apiRouter.mapUrls(app);

// CMS
cmsRouter.mapUrls(app);


// Start server
app.listen(config.port);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);