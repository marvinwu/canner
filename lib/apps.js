var Auth= require('./auth');
var Q= require('q');
var Client= require('./client');
var rp = require('request-promise');
var NodeGit = require("nodegit");

// throw err fn
var throwErr= function (err) {
	throw err;
}

exports.create= function (appUrl) {
	// first authorize by netrc, no file -> ask
	return Q.when(Auth.getCredentials())

	// create an app
	// post to /apps
	.then(function (credentials) {
		return Client.createApp(appUrl, credentials);
	}, throwErr)
	
	// add git url
	
}

exports.link= function () {
	// first authorize by netrc, no file -> ask
	// link to an app
	// add git url
}

