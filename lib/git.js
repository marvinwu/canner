var NodeGit = require("nodegit");
var Helper= require('./helper');

exports.Addremote= function (appUrl) {
	var repoDir= process.cwd();
	return NodeGit.Repository.open(repoDir)
				  .then(function (repo) {
				  	var url= 'http://'+Helper.git_host+'/'+appUrl+'.git';
					var remote = NodeGit.Remote.create(repo, "canner", url);
					return remote.url();
				  })
}