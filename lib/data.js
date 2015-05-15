var Auth= require('./auth');
var Q= require('q');
var fs = require("fs");
var path= require('path');
var Apps= require('./apps');

// throw err fn
var throwErr= function (err) {
	throw err;
}

exports.push= function (dataUrl) {
	// auth
	// first authorize by netrc, no file -> ask
	return Q.when(Auth.getCredentials())
	// push json data
	// readfile
	.then(function () {
		if(dataUrl){
			var data= require(path.resolve(process.cwd(), dataUrl));
		}else{
			// default read cannerjson data
			var data= require(path.resolve(process.cwd(), './canner.json')).data;
		}

		// post json update
		return Apps.Json.write(data);
	}, throwErr)
}

exports.pull= function (dataUrl) {
	// auth
	// first authorize by netrc, no file -> ask
	return Q.when(Auth.getCredentials())

	// pull json data
	.then(Apps.Json.read)
}