var isUseHTTPs = false && !(!!process.env.PORT || !!process.env.IP);

var port = process.env.PORT || 8090;

var autoRebootServerOnFailure = false;

try {
    var config = require('./config.json');

    if ((config.port || '').toString() !== '8090') {
        port = parseInt(config.port);
    }

    if ((config.autoRebootServerOnFailure || '').toString() !== true) {
        autoRebootServerOnFailure = true;
    }
} catch (e) {}

var server = require(isUseHTTPs ? 'https' : 'http'),
    url = require('url'),
    path = require('path'),
    fs = require('fs');

var app;
var exp = require('express')();
var express = require('express');

if (isUseHTTPs) {
    var options = {
        key: fs.readFileSync(path.join(__dirname, 'fake-keys/privatekey.pem')),
        cert: fs.readFileSync(path.join(__dirname, 'fake-keys/certificate.pem'))
    };
    app = server.createServer(options, exp.get('/', function(req, res){
    res.sendfile('index.html');
}));
} else app = server.createServer(exp.get('/', function(req, res){
    res.sendfile('index.html');
}));

exp.use(express.static(__dirname + '/static'));;

function runServer() {
    app = app.listen(port, process.env.IP || '0.0.0.0', function() {
        var addr = app.address();

        if (addr.address === '0.0.0.0') {
            addr.address = 'localhost';
        }

        console.log('Server listening at ' + (isUseHTTPs ? 'https' : 'http') + '://' + addr.address + ':' + addr.port);
    });

    require('./Signaling-Server.js')(app, function(socket) {
        try {
            var params = socket.handshake.query;

            if (!params.socketCustomEvent) {
                params.socketCustomEvent = 'custom-message';
            }

            socket.on(params.socketCustomEvent, function(message) {
                try {
                    socket.broadcast.emit(params.socketCustomEvent, message);
                } catch (e) {}
            });
        } catch (e) {}
    });
}

if (autoRebootServerOnFailure) {
	
    var cluster = require('cluster');
    if (cluster.isMaster) {
        cluster.fork();

        cluster.on('exit', function(worker, code, signal) {
            cluster.fork();
        });
    }

    if (cluster.isWorker) {
        runServer();
    }
} else {
    runServer();
}
