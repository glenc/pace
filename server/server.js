var mongoose  = require('mongoose');
var restify   = require('restify');
var bunyan    = require('bunyan');
var cqrs      = require('restify-cqrs');

var LOG = bunyan.createLogger({
  name: 'pace-api',
  stream: process.stdout,
  level: 'info'
});

var crossOrigin = function(req, res, next) {
  if (req.headers.origin) {
    res.header('Access-Control-Allow-Origin', req.headers.origin);
  }
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, Cookie, Set-Cookie, Accept, Access-Control-Allow-Credentials, Origin, Content-Type, Request-Id , X-Api-Version, X-Request-Id');
  res.header('Access-Control-Expose-Headers', 'Set-Cookie');
  return next();
};

var handleOptions = function(req, res, next) {
  if (req.headers.origin && req.headers['access-control-request-method']) {
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, Cookie, Set-Cookie, Accept, Access-Control-Allow-Credentials, Origin, Content-Type, Request-Id , X-Api-Version, X-Request-Id');
    res.header('Access-Control-Expose-Headers', 'Set-Cookie');
    res.header('Allow', req.headers['access-control-request-method']);
    res.header('Access-Control-Allow-Methods', req.headers['access-control-request-method']);
    if (req.log) {
      req.log.info({
        url: req.url,
        method: req.headers['access-control-request-method']
      }, "Preflight");
    }
    res.send(204);
    return next();
  } else {
    res.send(404);
    return next();
  }
};

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
LOG.info('Starting server for %s', env);

var config = require('./config/' + env + '.js');

var server = restify.createServer({
  name: 'village-api',
  version: '1.0.0',
  log: LOG
});

// plugins
server.pre(restify.pre.sanitizePath());
server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());
server.use(restify.gzipResponse());
server.use(crossOrigin);
server.opts(/\.*/, handleOptions);

// connect to db
mongoose.connect(config.db.connection);

// initialize cqrs
cqrs.init(server, config.cqrs, function(err) {
  if (err) { console.log(err); return;}
  server.listen(config.web.port, function start() {
    LOG.info('%s listening at %s', server.name, server.url);
  });
});

