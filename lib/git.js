var NodeGit = require("nodegit");
var Helper= require('./helper');
var Auth= require('./auth');
var path= require('path');
var Q= require('q');

exports.remote= {};

exports.remote.add= function (appUrl) {
	var repoDir= process.cwd();
	return NodeGit.Repository.open(repoDir)
				  .then(function (repo) {
				  	var url= appHttpUrl(appUrl);
					var remote = NodeGit.Remote.create(repo, "canner", url);
					return remote.url();
				  })
}

exports.remote.clone= function (appUrl, gitpath) {
	var gitpath= gitpath || './'+appUrl;
	var repoDir= path.resolve(process.cwd(), gitpath);
	var url;

	return Q.when(Auth.getCredentials())

			// get cred, and clone
			.then(function (cred) {
				/*
				var opts = {
				  remoteCallbacks: {
				    credentials: function() {
				      return NodeGit.Cred.userpassPlaintextNew(cred.username, cred.token);
				    }
				  }
				};*/
				url= appHttpUrl(appUrl);
				return NodeGit.Clone.clone(url, repoDir)
			}) 

			// add canner remote
		   .then(function (repo) {
			 var remote = NodeGit.Remote.create(repo, "canner", url);
			 return {url: remote.url(), path: repoDir, name: appUrl};
		   })
}

function appHttpUrl (appUrl, cred) {
	if(cred)
		return 'http://'+Helper.git_host+'/'+cred.username+'/'+cred.token+'/'+appUrl+'.git';
	else	
		return 'http://'+Helper.git_host+'/'+appUrl+'.git';
}