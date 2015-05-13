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
	})

	.then(function (repo) {
		// add git url
		// url: http://git.canner.io/<app.url>.git
		var url= 'http://'+Helper.git_host+'/'+app.url+'.git';
		var remote = NodeGit.Remote.create(repo, "canner", url);
		return remote.url();
	})

	.then(function (url) {
		// print success
		// show git url
		console.log(chalk.green('create app successfully!'));
		console.log(chalk.green('Name: ')+app.url);
		console.log(chalk.green('Git url: ')+url);
	})
}

exports.link= function () {
	// first authorize by netrc, no file -> ask
	// link to an app
	// add git url
}

