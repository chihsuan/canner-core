var path = require('path');
var Q = require('q');
var _ = require('lodash');
var localdir = require('localdir');
var fs = require('fs');
var stage = require('node-stage');
var watch = require('watch');
var httpServer = require('http-server');
var chalk = require('chalk');

var generator = require("./generator");

/*
 *  Build
 *  Build a canner from a canner.json
 *  @param {string | Object} cannerJson - source to canner.json, default ./canner.json
 *  or a object, containing canner.json settings
 *  @param {object} options - options
 *  @param {boolean} watchOpt - whether watch the folder or not
 */

module.exports = function(cannerJson, options, watchOpt) {
  // output is the dir path where content will be generated
  var output = options.output || process.cwd();
  // serveDir
  var serveDir = options.serve;
  // template engine
  var tmp_engine = options.engine || 'hbs';
  // cannerJson default to local dir path
  cannerJson = cannerJson || './canner.json';

  // see if we need to open localhost, for convinience
  if (serveDir !== undefined && options.localhost) {
    var server = httpServer.createServer();
    var host = '127.0.0.1';
    var port = options.port || 4000;
    server.listen(port, host);
    stage.success('Serving "' + serveDir + '" at http://localhost:' + port);
  }

  // if watch needed, start file watch
  if (watchOpt) {
    serveDir = serveDir ? serveDir : './';
    _watchFs(serveDir, cannerJson, output, options);
    stage.process('Watching files under \'' + chalk.cyan(serveDir) + '\'...');
  }

  // generate
  stage.process('Starting \'' + chalk.cyan('build')  + '\'...');
  return generator.build(output, cannerJson, tmp_engine, options);
};

var _regenerateDoc = function(monitor, dir, cannerJson, output, options, filter) {
  var rebuildAndWatch= function (cannerJson) {
    
    var tmp_engine = options.engine || 'hbs';
    var buildPromise= generator.build(output, cannerJson, tmp_engine, options);

    // if watch callback exist
    if(options.watchCallback)
      buildPromise.then(options.watchCallback);

    // catch error
    buildPromise.catch(function(err) {
        console.error(err);
    });

    // watch again
    _watchFs(dir, cannerJson, output, options);
  };

  // remove all listeners
  monitor.removeAllListeners();

  // reload settings
  if(!options.reloader)
    rebuildAndWatch(cannerJson);
  else
    Q.when(options.reloader()).then(function (cannerJson) {
      if(filter)
        cannerJson= _.filter(cannerJson, filter);
      rebuildAndWatch(cannerJson);
    });
}

var _watchFs = function(dir, cannerJson, output, options) {

  dir = path.resolve(dir);
  watch.createMonitor(dir, function(monitor) {

    monitor.on("created", function(f, stat) {
      // Handle new files
      monitor.stop();
      stage.process("File " + f + " have been created. ");

      // filter
      if(options.createFilter)
        var filter= function (row) {
          return options.createFilter(row, f, stat);
        };

      // generate
      _regenerateDoc(monitor, dir, cannerJson, output, options, filter);
    });
    monitor.on("changed", function(f, curr, prev) {
      // Handle file changes
      monitor.stop();
      stage.process("File " + f + " have been changed. ");

      // filter
      var filter;
      if(options.changeFilter)
        filter= function (row) {
          return options.changeFilter(row, f, curr, prev);
        };

      // generate
      _regenerateDoc(monitor, dir, cannerJson, output, options, filter);
    });
    monitor.on("removed", function(f, stat) {
      // Handle removed files
      monitor.stop();
      stage.process("File " + f + " have been removed. ");

      // filter
      if(options.removeFilter)
        filter= function (row) {
          return options.removeFilter(row, f, stat);
        };

      // generate
      _regenerateDoc(monitor, dir, cannerJson, output, options, filter);
    });

  });
};
