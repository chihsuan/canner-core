// var Q = require('q');
// var exec = require('child_process').exec;
// var npm = require('npm');
// var stage = require('node-stage');

// function getGenerator(generator) {
// 	var npm_load = Q.nfbind(npm.load);
// 	var gen = generator + '-can';
// 	var prefix;

// 	Q.nfcall(exec, 'npm config get prefix')

// 	.then(function(stdout, stderr) {
// 		prefix = stdout[0].replace(/(\r\n|\n|\r)/gm,"");

// 		return npm_load();
// 	})

// 	.then(function(npm) {
// 		var npm_install = Q.nfbind(npm.commands.install);

// 		return npm_install(prefix + '/lib', gen)
// 	})

// 	.then(function(result) {
// 		console.assert(result);
// 		stage.success('Install successfully generator: ' + generator + '-can')
// 	})

// 	.fail(function(err) {
// 		stage.error('Installing package error: ' + err);
// 		return process.exit(3);
// 	})
// }

// module.exports = getGenerator;