var NodeGit = require("nodegit");
var Helper = require('./helper');
var Auth = require('./auth');
var path = require('path');
var chalk = require('chalk');
var util = require('util');
var Client = require('./client');
var exec = require('child_process').exec;
var Q = require('q');

exports.remote = {};

exports.remote.add = function(appUrl) {
  var repoDir = process.cwd();
  var cred;
  var repo;

  return Q.when(Auth.getCredentials())

  .then(function(_cred) {
    cred = _cred;
    return NodeGit.Repository.open(repoDir);
  })
  .then(function(_repo) {
    repo = _repo;
    return appHttpUrl(appUrl, cred);
  })
  .then(function(url) {
    var remote = NodeGit.Remote.create(repo, "canner", url);
    return url;
  })
}

exports.remote.clone = function(appUrl, gitpath) {
  var gitpath = gitpath || './' + appUrl;
  var repoDir = path.resolve(process.cwd(), gitpath);
  var url;

  return Q.when(Auth.getCredentials())

  // get cred, and clone
  .then(function(cred) {
    return appHttpUrl(appUrl, cred);
  })
  .then(function(_url) {
    url = _url;
    return NodeGit.Clone.clone(url, repoDir)
  })
  // add canner remote
  .then(function(repo) {
    var remote = NodeGit.Remote.create(repo, "canner", url);
    return {
      url: remote.url(),
      path: repoDir,
      name: appUrl
    };
  })
}

exports.push = function(appUrl) {
  var repoDir = process.cwd();
  var url;
  var repo;

  return Q.when(Auth.getCredentials())

  // get cred
  .then(function(cred) {
    return appHttpUrl(appUrl, cred);
  })
  // get and set new gitUrl
  .then(function(gitUrl) {
    var cmd = 'git remote set_url canner ' + gitUrl;
    return exec(cmd);
  })
  // push
  .then(function() {
    var cmd = 'git push canner master';
    return exec(cmd, function(err, stdout, stderr) {
      if (!err) {
        console.log(chalk.green(util.format('Push %s to canner master successfully!', 
        appUrl)));
      }
    });
  })
}


function appHttpUrl(appUrl, cred) {
  return Client.getGitToken(appUrl, cred)
    .then(function(rep) {
      return util.format('http://%s/%s/%s.git', Helper.git_host, rep.gitToken, appUrl);
    });
}
