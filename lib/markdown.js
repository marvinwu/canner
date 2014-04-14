// markdown generater.

var async = require('async');
var Q = require('q');
var mdtag = require('mdtag');


var fs = require('fs');
var path = require('path');

var md = function(content, dir) {
	var d = Q.defer();

	mdtag.html(content, dir, function(mdbuild) {
        return d.resolve(mdbuild);
	})
	
	return d.promise;

}


module.exports = md