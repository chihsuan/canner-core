var path = require('path');
var Q = require('q');
var _ = require('lodash');
var fs = require('fs');
var npm = require('npm');
var FS = require("q-io/fs");

var read= function (can, filePath) {
	return Q.nfcall(npm.load, { global:true })

		// get config from npm config, and check if package exist
		.then(function readFile() {
			var prefix= npm.config.get('prefix');
			//can= <name>-can
			absolutePath = prefix + '/lib/node_modules/'+ can + filePath;
			return FS.read(absolutePath);
		})
}

module.exports= read;
