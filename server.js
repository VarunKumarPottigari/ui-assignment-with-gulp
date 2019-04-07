var StaticServer = require('static-server');

var server = new StaticServer({
    rootPath: './public',
    port: 3001
});

server.start(function() {
    console.log('starting server on port: ' + server.port);
});