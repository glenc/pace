var config = {};

config.db = {
  connection: 'mongodb://localhost/village-dev'
};

config.web = {
  port: 8080
};

config.cqrs = {
  searchPaths: {
    commandHandlers: 'domain/**/command-handlers/**/*.js',
    queries: 'domain/**/queries/**/*.js',
    views: 'domain/**/views/**/*.js'
  },

  commandStore: require('restify-cqrs-mongodb').CommandStore(config.db.connection)
};

module.exports = config;
