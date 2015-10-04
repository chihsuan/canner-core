var Q= require('q');
var stringStream= require('string-stream');
var should= require('should');

function noopSource () {
	// Source constructor
	this.prefix= 'read from ';
}

noopSource.prototype.read = function(filePath, msg) {
	// return file content
	return Q(this.prefix+filePath+': '+msg);
};

noopSource.prototype.createReadStream = function(filePath) {
	// return a readStream
	return new stringStream(this.prefix+ filePath) 
};

noopSource.prototype.init = function(dir, generator) {
	// init a app with a can
	return Q('init '+dir+' '+generator);
};

noopSource.prototype.build = function(output, cannerJson, tmp_engine, options) {
	// build using a template
	var args = Array.prototype.slice.call(arguments, 0);
	return Q(args.join());
};

// initialize a canner instance
var CannerInstance= require('../lib/instance');
var canner= new CannerInstance({ source: noopSource });

describe('Instance', function () {
	it('should read', function () {
		return canner.read('test', 'msg')

		.then(function (content) {
			return content.should.equal('read from test: msg');
		})
	})

	it('shoud readStream', function (done) {
		var writeStream= new stringStream()
			, counter = 0;
		writeStream.on('end', function () {
			writeStream.toString().should.equal('read from test');
			 if (counter++) done();
		});
		canner.createReadStream('test').pipe(writeStream);
		writeStream.end();
	})

	it('should init', function () {
		var dir= 'testDir';
		var can= 'testCan';
		return canner.init(dir, can)

		.then(function (content) {
			return content.should.equal('init '+dir+' '+can);
		})
	})

	it('shoud build', function () {
		var dir= 'dir', 
			options= 'options', 
			watchOpt= 'watchOpt';

		return canner.build(dir, options, watchOpt)

		.then(function (content) {
			return content.should.equal([dir, options, watchOpt].join());
		})
	})
})