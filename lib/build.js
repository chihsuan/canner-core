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
  if (!options) options = {};

  output = options.output || process.cwd();
  port = options.port || 4000;
  serveDir = options.serve;
  tmp_engine = options.engine || 'hbs';

  if (serveDir !== undefined) {
    var server = httpServer.createServer();
    var host = '127.0.0.1';
    server.listen(port, host);
    stage.success('Serving "' + serveDir + '" at http://localhost:' + port)
  }

  setting = setting || './canner.json';

  stage.process('Starting build ...');

  if (watchOpt) {
    serveDir = serveDir ? serveDir : './';
    _watchFs(serveDir, setting, output, options);
    stage.success('Watching files under "' + serveDir + '"....-o_o-')
  }

  return generate.doc(output, setting, tmp_engine, options);

};

var _regenerateDoc = function(monitor, dir, setting, output, options, filter) {
  var rebuildAndWatch= function (setting) {
    var buildPromise= generate.doc(output, setting, tmp_engine, options)

    // if watch callback exist
    if(options.watchCallback)
      buildPromise.then(options.watchCallback)

    // catch error
    buildPromise.catch(function(err) {
        console.error(err);
    });

    // watch again
    _watchFs(dir, setting, output, options);
  }

  // remove all listeners
  monitor.removeAllListeners();

  // reload settings
  if(!options.reloader)
    rebuildAndWatch(setting);
  else
    Q.when(options.reloader()).then(function (setting) {
      if(filter)
        setting= _.filter(setting, filter);
      rebuildAndWatch(setting)
    }) 
}

var _watchFs = function(dir, setting, output, options) {

  var dir = path.resolve(dir);
  watch.createMonitor(dir, function(monitor) {

    monitor.on("created", function(f, stat) {
      // Handle new files
      monitor.stop();
      stage.process("File " + f + " have been created. ")

      // filter
      if(options.createFilter)
        var filter= function (row) {
          return options.createFilter(row, f, stat);
        }

      // generate
      _regenerateDoc(monitor, dir, setting, output, options, filter);
    })
    monitor.on("changed", function(f, curr, prev) {
      // Handle file changes
      monitor.stop();
      stage.process("File " + f + " have been changed. ")

      // filter
      if(options.changeFilter)
        var filter= function (row) {
          return options.changeFilter(row, f, curr, prev);
        }

      // generate
      _regenerateDoc(monitor, dir, setting, output, options, filter);
    })
    monitor.on("removed", function(f, stat) {
      // Handle removed files
      monitor.stop();
      stage.process("File " + f + " have been removed. ")

      // filter
      if(options.removeFilter)
        var filter= function (row) {
          return options.removeFilter(row, f, stat);
        }

      // generate
      _regenerateDoc(monitor, dir, setting, output, options, filter);
    })

  })
}


module.exports = {
  folder: build
};
