// markdown generater.

var marked = require("marked");
var async = require('async');
var Q = require('q')

var fs = require('fs');
var path = require('path');

var mdObj = {}

var md = function(dir, content) {
	return mdObj.load(dir, content.block)
}

mdObj.load = function(dir, block) {

	var deferred = Q.defer();
	// loop through topic markdown
	async.each(block, function(main, cb) {
		// reading main markdown script
		var rs = fs.createReadStream(path.resolve(dir, main.md), {encoding: 'UTF-8'})
		var md_data = '';

		rs.on('error', function(err) {
			throw new Error(err)
		})

		rs.on('data', function(md_chunk) {
			md_data += md_chunk
		})

		rs.on('end', function() {
			main.md = mdObj.parse(md_data);

			// if no sub title
			if(main.sub !== undefined) {
				async.each(main.sub, function(sub, callback) {

					var rs = fs.createReadStream(path.resolve(dir, sub.md), {encoding: 'UTF-8'})
					var sub_data = '';

					rs.on('error', function(err) {
						throw new Error(err)
					})

					rs.on('data', function(md_chunk) {
						sub_data += md_chunk
					})

					rs.on('end', function() {
						// change md path to data
						sub.md = mdObj.parse(sub_data);
						callback();
					})
					
				}, function(err) {
					if(err) {
						cb(err);
					}else {
						cb();
					}
				})
			}else {
				cb();
			}
		})

	}, function(err) {
		if(err)
			deferred.reject(new Error(err));
		else 
			deferred.resolve(null);
	})
	return deferred.promise;

}

mdObj.parse = function(md) {
	return marked(md)
}


module.exports = {
	build: md
}