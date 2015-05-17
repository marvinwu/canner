var Auth= require('./auth');
var Q= require('q');
var fs = require("fs");
var path= require('path');
var Apps= require('./apps');
var Client= require('./client');

// throw err fn
var throwErr= function (err) {
	throw err;
}

exports.push= function (appUrl, dataUrl) {
	// auth
	// first authorize by netrc, no file -> ask
	return Q.when(Auth.getCredentials())
	// push json data
	// readfile
	.then(function (cred) {
		if(dataUrl){
			var data= require(path.resolve(process.cwd(), dataUrl));
		}else{
			// default read cannerjson data
			var data= require(path.resolve(process.cwd(), './canner.json')).data;
		}

		// post json update
		return Client.writeAppData(appUrl, cred, data);
	}, throwErr)
}

exports.pull= function (appUrl) {
	// auth
	// first authorize by netrc, no file -> ask
	return Q.when(Auth.getCredentials())

	// pull json data
	.then(function (cred) {
		return Client.readAppData(appUrl, cred);
	})
}