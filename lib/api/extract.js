var _ = require('lodash');
var path = require('path');
var Q = require('q');
var FS = require("q-io/fs");
var util = require('util');
var hbs_extract = require('hbs-extract');

module.exports = function(hbsPath, options) {
  var cannerJson = {
    layout: './index.hbs',
    filename: './index.html',
    data: {},
    columns: {},
    seq: []
  };
  
  hbs_extract.fromFile(hbsPath, afterKeyCreate)
    .then(function(result) {
      cannerJson.data = result;
      if (options.print) {
        return console.log(JSON.stringify(cannerJson, null, 4));
      }
      
      return FS.write(options.outputPath, JSON.stringify(cannerJson, null, 4))
        .then(function() {
          console.log('successfully output result to', options.outputPath);
        });
    })
    .catch(function(error) {
      console.log(error);
    });

  function afterKeyCreate(path) {
    if (!cannerJson.columns.hasOwnProperty(path[0])) {
      cannerJson.columns[path[0]] = { 
        '~description': ''
      };
      return cannerJson.seq.push(path[0]);
    }
    _deepInsert(cannerJson.columns, path);
  }
};


function _deepInsert(data, path) {
  path.forEach(function(key) {
    if (!data.hasOwnProperty(key)) {
      data[key] = {
        '~description': '',
        '~format': ''
      };
    }
    data = data[key];
  });
}


