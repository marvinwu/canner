// markdown generater.

var markdown = require( "markdown" ).markdown;
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
		fs.readFile(path.resolve(dir, main.md), {encoding: 'UTF-8'}, function(err, data) {
			if(err){
				throw new Error(err)
			}else{
				main.md = mdObj.parse(data);

				// if no sub title
				if(main.sub !== undefined) {
					async.each(main.sub, function(sub, callback) {

						fs.readFile(path.resolve(dir, sub.md), {encoding: 'UTF-8'}, function(err, data) {
							if(err){
								callback(err);
							}else{
								// change md path to data
								sub.md = mdObj.parse(data);
								callback();
							}
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
	return markdown.toHTML(md)
}


module.exports = {
	build: md
}