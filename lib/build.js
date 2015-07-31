var path = require('path');
var Q = require('q');
var _ = require('lodash');
var localdir = require('localdir');
var fs = require('fs');
var stage = require('node-stage');
var watch = require('watch');
var httpServer = require('http-server');

var generate = require("./generate");

var build = function(setting, options, watchOpt) {
    var deferred = Q.defer();
    if(!options) options = {};

    output = options.output || process.cwd();
    port = options.port || 4000;
    serveDir = options.serve;
    tmp_engine = options.engine || 'hbs';

    if(serveDir !== undefined) {
      var server = httpServer.createServer();
      var host = '127.0.0.1';
      server.listen(port, host);
    	stage.success('Serving "' + serveDir + '" at http://localhost:' + port)
    }

    setting = setting || './canner.json';

    stage.process('Starting build ...');

    if(watchOpt) {
        serveDir = serveDir ? serveDir: './';
        _watchFs(serveDir, setting, output, options);
        stage.success('Watching files under "' + serveDir + '"....-o_o-')
    }

    return generate.doc(output, setting, tmp_engine, options);

};

var _regenerateDoc = function(monitor, dir, setting, output, options) {
    monitor.removeAllListeners();
    generate.doc(output, setting, function(err) {
        if(err)
            console.error(err);
        _watchFs(dir, setting, output, options);
    });
}

var _watchFs = function(dir, setting, output, options) {

    var dir = path.resolve(dir);
    watch.createMonitor(dir, function (monitor) {

        monitor.on("created", function (f, stat) {
            // Handle new files
            monitor.stop();
            stage.process("File " + f + " have been created. ")
            _regenerateDoc(monitor, dir, setting, output, options);
        })
        monitor.on("changed", function (f, curr, prev) {
            // Handle file changes
            monitor.stop();
            stage.process("File " + f + " have been changed. ")
            _regenerateDoc(monitor, dir, setting, output, options);
        })
        monitor.on("removed", function (f, stat) {
            // Handle removed files
            monitor.stop();
            stage.process("File " + f + " have been removed. ")
            _regenerateDoc(monitor, dir, setting, output, options);
        })

    })
}


module.exports = {
    folder: build
};
