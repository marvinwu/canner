var fs = require('fs');
var assert = require('assert');
var Q = require('q');
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
				var output = fs.readFileSync(__dirname + '/hbs/original/index.html', {encoding: 'utf8'});
				var result = fs.readFileSync(__dirname + '/result/hbs_original.html', {encoding: 'utf8'});

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
				var output = fs.readFileSync(__dirname + '/hbs/helper/index.html', {encoding: 'utf8'});
				var result = fs.readFileSync(__dirname + '/result/hbs_helper.html', {encoding: 'utf8'});

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
				var output = fs.readFileSync(__dirname + '/hbs/yaml/index.html', {encoding: 'utf8'});
				var result = fs.readFileSync(__dirname + '/result/hbs_yaml.html', {encoding: 'utf8'});

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
				var output = fs.readFileSync(__dirname + '/nunjucks/original/index.html', {encoding: 'utf8'});
				var result = fs.readFileSync(__dirname + '/result/nun_original.html', {encoding: 'utf8'});

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
				var output = fs.readFileSync(__dirname + '/nunjucks/yaml/index.html', {encoding: 'utf8'});
				var result = fs.readFileSync(__dirname + '/result/nun_yaml.html', {encoding: 'utf8'});

				assert.equal(output, result);
				done();
			})
			.catch(function(err) {
				console.error(err);
			})
	})
})
