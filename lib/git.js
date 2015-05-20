var NodeGit = require("nodegit");
var Helper= require('./helper');

// throw err fn
var throwErr= function (err) {
	throw err;
}

exports.remote= {};

exports.remote.add= function (appUrl) {
	var repoDir= process.cwd();
	return NodeGit.Repository.open(repoDir)
				  .then(function (repo) {
				  	var url= 'http://'+Helper.git_host+'/'+appUrl+'.git';
					var remote = NodeGit.Remote.create(repo, "canner", url);
					return remote.url();
				  }, throwErr)
}