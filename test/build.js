var fs = require('fs');
var assert = require('assert');
var Q = require('q');
var path= require('path');
var exec = require('child_process').exec;

var canner = require('../index');

rm_html = exec('rm ./test/**/**/index.html', function(err) {
	if(err)
		console.error(err)
})


describe('build in handlebars canner.json', function() {
	it("should build canner.json to html", function(done) {
		canner.build(__dirname + '/hbs/original/canner.json', {output: __dirname + '/hbs/original'})
			.then(function() {
				var output = fs.readFileSync(__dirname + '/hbs/original/index.html', {encoding: 'utf8'}).replace(/\s+/g, '');
				var result = fs.readFileSync(__dirname + '/result/hbs_original.html', {encoding: 'utf8'}).replace(/\s+/g, '');

				assert.equal(output, result);
				done();
			})
			.catch(function(err) {
				console.error(err)
			})
	})

	it("should build canner.json to html with hbs helper", function(done) {
		canner.build(__dirname + '/hbs/helper/canner.json', {output: __dirname + '/hbs/helper'})
			.then(function() {
				var output = fs.readFileSync(__dirname + '/hbs/helper/index.html', {encoding: 'utf8'}).replace(/\s+/g, '');
				var result = fs.readFileSync(__dirname + '/result/hbs_helper.html', {encoding: 'utf8'}).replace(/\s+/g, '');

				assert.equal(output, result);
				done();
			})
			.catch(function(err) {
				console.error(err);
			})
	})

	it("should build canner.yaml to html", function(done) {
		canner.build(__dirname + '/hbs/yaml/canner.yaml', {output: __dirname + '/hbs/yaml'})
			.then(function() {
				var output = fs.readFileSync(__dirname + '/hbs/yaml/index.html', {encoding: 'utf8'}).replace(/\s+/g, '');
				var result = fs.readFileSync(__dirname + '/result/hbs_yaml.html', {encoding: 'utf8'}).replace(/\s+/g, '');

				assert.equal(output, result);
				done();
			})
			.catch(function(err) {
				console.error(err);
			})
	})
})

describe('build in nunjucks canner.json', function() {
	it("should build canner.json to html", function(done) {
		canner.build(__dirname + '/nunjucks/original/canner.json', {output: __dirname + '/nunjucks/original', engine: 'nunjucks'})
			.then(function() {
				var output = fs.readFileSync(__dirname + '/nunjucks/original/index.html', {encoding: 'utf8'}).replace(/\s+/g, '');
				var result = fs.readFileSync(__dirname + '/result/nun_original.html', {encoding: 'utf8'}).replace(/\s+/g, '');

				assert.equal(output, result);
				done();
			})
			.catch(function(err) {
				console.error(err)
			})
	})


	it("should build canner.yaml to html", function(done) {
		canner.build(__dirname + '/nunjucks/yaml/canner.yaml', {output: __dirname + '/nunjucks/yaml', engine: 'nunjucks'})
			.then(function() {
				var output = fs.readFileSync(__dirname + '/nunjucks/yaml/index.html', {encoding: 'utf8'}).replace(/\s+/g, '');
				var result = fs.readFileSync(__dirname + '/result/nun_yaml.html', {encoding: 'utf8'}).replace(/\s+/g, '');

				assert.equal(output, result);
				done();
			})
			.catch(function(err) {
				console.error(err);
			})
	})
})

describe('build in jade canner.json', function() {
	it("should build canner.json to html", function(done) {
		canner.build(__dirname + '/jade/original/canner.json', {output: __dirname + '/jade/original', engine: 'jade'})
			.then(function() {
				var output = fs.readFileSync(__dirname + '/jade/original/index.html', {encoding: 'utf8'}).replace(/\s+/g, '');
				var result = fs.readFileSync(__dirname + '/result/jade_original.html', {encoding: 'utf8'}).replace(/\s+/g, '');

				assert.equal(output, result);
				done();
			})
			.catch(function(err) {
				console.error(err)
			})
	})


	it("should build canner.yaml to html", function(done) {
		canner.build(__dirname + '/jade/yaml/canner.yaml', {output: __dirname + '/jade/yaml', engine: 'jade'})
			.then(function() {
				var output = fs.readFileSync(__dirname + '/jade/yaml/index.html', {encoding: 'utf8'}).replace(/\s+/g, '');
				var result = fs.readFileSync(__dirname + '/result/jade_yaml.html', {encoding: 'utf8'}).replace(/\s+/g, '');

				assert.equal(output, result);
				done();
			})
			.catch(function(err) {
				console.error(err);
			})
	})
})

describe('build in swig canner.json', function() {
	it("should build canner.json to html", function(done) {
		canner.build(__dirname + '/swig/original/canner.json', {output: __dirname + '/swig/original', engine: 'swig'})
			.then(function() {
				var output = fs.readFileSync(__dirname + '/swig/original/index.html', {encoding: 'utf8'}).replace(/\s+/g, '');
				var result = fs.readFileSync(__dirname + '/result/swig_original.html', {encoding: 'utf8'}).replace(/\s+/g, '');

				assert.equal(output, result);
				done();
			})
			.catch(function(err) {
				console.error(err)
			})
	})


	it("should build canner.yaml to html", function(done) {
		canner.build(__dirname + '/swig/yaml/canner.yaml', {output: __dirname + '/swig/yaml', engine: 'swig'})
			.then(function() {
				var output = fs.readFileSync(__dirname + '/swig/yaml/index.html', {encoding: 'utf8'}).replace(/\s+/g, '');
				var result = fs.readFileSync(__dirname + '/result/swig_yaml.html', {encoding: 'utf8'}).replace(/\s+/g, '');

				assert.equal(output, result);
				done();
			})
			.catch(function(err) {
				console.error(err);
			})
	})
})

describe('build in mustache canner.json', function() {
	it("should build canner.json to html", function(done) {
		canner.build(__dirname + '/mustache/original/canner.json', {output: __dirname + '/mustache/original', engine: 'mustache'})
			.then(function() {
				var output = fs.readFileSync(__dirname + '/mustache/original/index.html', {encoding: 'utf8'}).replace(/\s+/g, '');
				var result = fs.readFileSync(__dirname + '/result/mus.html', {encoding: 'utf8'}).replace(/\s+/g, '');

				assert.equal(output, result);
				done();
			})
			.catch(function(err) {
				console.error(err)
			})
	})


	it("should build canner.yaml to html", function(done) {
		canner.build(__dirname + '/mustache/yaml/canner.yaml', {output: __dirname + '/mustache/yaml', engine: 'mustache'})
			.then(function() {
				var output = fs.readFileSync(__dirname + '/mustache/yaml/index.html', {encoding: 'utf8'}).replace(/\s+/g, '');
				var result = fs.readFileSync(__dirname + '/result/mus.html', {encoding: 'utf8'}).replace(/\s+/g, '');

				assert.equal(output, result);
				done();
			})
			.catch(function(err) {
				console.error(err);
			})
	})
})

describe('build in dust canner.json', function() {
	it("should build canner.json to html", function(done) {
		canner.build(__dirname + '/dust/original/canner.json', {output: __dirname + '/dust/original', engine: 'dust'})
			.then(function() {
				var output = fs.readFileSync(__dirname + '/dust/original/index.html', {encoding: 'utf8'}).replace(/\s+/g, '');
				var result = fs.readFileSync(__dirname + '/result/dust.html', {encoding: 'utf8'}).replace(/\s+/g, '');

				assert.equal(output, result);
				done();
			})
			.catch(function(err) {
				console.error(err)
			})
	})


	it("should build canner.yaml to html", function(done) {
		canner.build(__dirname + '/dust/yaml/canner.yaml', {output: __dirname + '/dust/yaml', engine: 'dust'})
			.then(function() {
				var output = fs.readFileSync(__dirname + '/dust/yaml/index.html', {encoding: 'utf8'}).replace(/\s+/g, '');
				var result = fs.readFileSync(__dirname + '/result/dust.html', {encoding: 'utf8'}).replace(/\s+/g, '');

				assert.equal(output, result);
				done();
			})
			.catch(function(err) {
				console.error(err);
			})
	})
})

describe('build using object', function () {
	it('should save to file', function (done) {
		var output= __dirname + '/hbs/original';
		canner.build(__dirname+'/hbs/original/canner.json', 
			{
				output: output, 
				data: {
					"title": "wwwy3y3",
					"items": "item wwwy3y3",
				}
			})
		.done(function () {
			var result = fs.readFileSync(__dirname + '/result/hbs_data_input.html', {encoding: 'utf8'}).replace(/\s+/g, '');
			var html= fs.readFileSync(path.resolve(output, './index.html'), 'utf8').replace(/\s+/g, '');
			assert.equal(html, result);
			done();
		}, function (err) {
			console.log(err);
		})
	})

	it('should return html', function (done) {
		canner.build(__dirname+'/hbs/original/canner.json', 
			{
				output: __dirname + '/hbs/original', 
				data: {
					"title": "wwwy3y3",
					"items": "item wwwy3y3"
				}, 
				returnContent: true
			})
		.done(function (html) {
			var result = fs.readFileSync(__dirname + '/result/hbs_data_input.html', {encoding: 'utf8'}).replace(/\s+/g, '');

			assert.equal(html[0].replace(/\s+/g, ''), result);
			done();
		}, function (err) {
			console.log(err);
		})
	})

	it('should use object to return content', function (done) {
		var obj= JSON.parse(fs.readFileSync(__dirname+'/hbs/original/canner.json', 'utf8'));
		canner.build(obj, 
			{
				cwd: __dirname + '/hbs/original',
				output: __dirname + '/hbs/original', 
				data: {
					"title": "wwwy3y3",
					"items": "item wwwy3y3"
				}, 
				returnContent: true
			})
		.done(function (html) {
			var result = fs.readFileSync(__dirname + '/result/hbs_data_input.html', {encoding: 'utf8'}).replace(/\s+/g, '');

			assert.equal(html[0].replace(/\s+/g, ''), result);
			done();
		}, function (err) {
			console.log(err);
		})
	})
})

