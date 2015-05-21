var Auth= require('./auth');
var Q= require('q');
var Client= require('./client');
var rp = require('request-promise');
var NodeGit = require("nodegit");
var Helper= require('./helper');
var chalk= require('chalk');

// throw err fn
var throwErr= function (err) {
	throw err;
}

exports.create= function (appUrl) {
	var app;
	// first authorize by netrc, no file -> ask
	return Q.when(Auth.getCredentials())

	// create an app
	// post to /apps
	.then(function (credentials) {
		return Client.createApp(appUrl, credentials);
	}, throwErr)
	
	// http url, ssh will support in the future
	// I now have no idea how to scale public_key
	// open repo
	.then(function (_app) {
		app= _app;
		var repoDir= process.cwd();
		return NodeGit.Repository.open(repoDir);
	}, throwErr)

	.then(function (repo) {
		// add git url
		// url: http://git.canner.io/<app.url>.git
		var url= 'http://'+Helper.git_host+'/'+app.url+'.git';
		var remote = NodeGit.Remote.create(repo, "canner", url);
		app.gitUrl= remote.url();
		return app;
	}, throwErr)
}

exports.deploy= function (appUrl) {
	return Q.when(Auth.getCredentials())

	// deploy an app
	.then(function (credentials) {
		return Client.deployApp(appUrl, credentials);
	}, throwErr)
}

// get appUrl from git remote in local
exports.getUrl= function (appUrl) {
	// return appUrl
	if(appUrl)
		return Q(appUrl);

	// else find from git remote
	return NodeGit.Repository.open(process.cwd())
				  .then(function (repo) {
				  	return NodeGit.Remote.lookup(repo, "canner");
				  })

				  .then(function (remote) {
				  	// alphanumeric character including the underscore
				  	// also dash
				  	// followed by .git
				  	var regex= /[\w\-]+(?=\.git)/g;
				  	var url= remote.url().match(regex)[0];
				  	return url;
				  })
}

// list my apps
exports.list= function () {
	// first authorize by netrc, no file -> ask
	return Q.when(Auth.getCredentials())

	// create an app
	// post to /apps
	.then(function (credentials) {
		return Client.listApps(credentials);
	}, throwErr)
}
