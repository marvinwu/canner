var NodeGit = require("nodegit");
var Helper= require('./helper');
var Auth= require('./auth');
var path= require('path');
var Q= require('q');

// throw err fn
var throwErr= function (err) {
	throw err;
}

exports.remote= {};

exports.remote.add= function (appUrl) {
	var repoDir= process.cwd();
	return NodeGit.Repository.open(repoDir)
				  .then(function (repo) {
				  	var url= appHttpUrl(appUrl);
					var remote = NodeGit.Remote.create(repo, "canner", url);
					return remote.url();
				  }, throwErr)
}

exports.remote.clone= function (appUrl, gitpath) {
	var gitpath= gitpath || './'+appUrl;
	var repoDir= path.resolve(process.cwd(), gitpath);
	var url= appHttpUrl(appUrl);

	return Q.when(Auth.getCredentials())

			// get cred, and clone
			.then(function (cred) {
				var opts = {
				  remoteCallbacks: {
				    credentials: function() {
				      return NodeGit.Cred.userpassPlaintextNew(cred.username, cred.token);
				    },
				    certificateCheck: function() {
				      return 1;
				    }
				  }
				};
				return NodeGit.Clone.clone(url, repoDir, opts)
			}, throwErr) 

			// add canner remote
		   .then(function (repo) {
			 var remote = NodeGit.Remote.create(repo, "canner", url);
			 return {url: remote.url(), path: repoDir, name: appUrl};
		   }, throwErr)
}

function appHttpUrl (appUrl) {
	return url= 'http://'+Helper.git_host+'/'+appUrl+'.git';
}