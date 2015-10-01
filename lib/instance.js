// source
var LocalSource= require('./source/local');

function Canner (args) {
	args= args || {};
	// constructor
	this.source= (args.source)
		? new args.source()
		: new LocalSource();
}

Canner.prototype.init = function(dir, generator) {
	var self= this;
	return self.source.init(dir, generator);
};

Canner.prototype.build = function(cannerJson, options, watchOpt) {
	var self= this;
	return self.source.build(cannerJson, options, watchOpt);
};

Canner.prototype.read = function(can, filePath) {
	var self= this;
	return self.source.read(can, filePath);
};

Canner.prototype.createReadStream = function(can, filePath) {
	var self= this;
	return self.source.createReadStream(can, filePath);
};

Canner.prototype.create = function(hbsfile, options) {
  var self= this;
  return self.source.create(hbsfile, options);
}

module.exports= Canner;
