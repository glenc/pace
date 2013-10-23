var mongoose  = require('mongoose');
var restify   = require('restify');
var cqrs      = require('restify-cqrs');

// initialize the environment
function getEnvironment() {
  if (process.argv.length > 2) {
    if (process.argv[1].match(/server\.js$/)) {
      return process.argv[2];
    }
  }
  return process.env.NODE_ENV || 'development';
}

var env = getEnvironment();

var config = require('./config/' + env + '.js');

var server = restify.createServer({
  name: 'village-api',
  version: '1.0.0'
});

// plugins
server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());
server.use(restify.gzipResponse());

// connect to db
mongoose.connect(config.db.connection);

// initialize cqrs
cqrs.init(server, config.cqrs, function(err) {
  if (err) { console.log(err); return;}
  server.listen(config.web.port, function start() {
    console.log('%s listening at %s', server.name, server.url);
  });
});

