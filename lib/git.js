var NodeGit = require("nodegit");
var Helper = require('./helper');
var Auth = require('./auth');
var path = require('path');
var Client = require('./client');
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

function appHttpUrl(appUrl, cred) {
  return Client.getGitToken(cred)
    .then(function(rep) {
      return 'http://' + Helper.git_host + '/' 
        + rep.hashToken + '/' + appUrl + '.git';
    });
}
