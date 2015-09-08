var Helper = require('./helper');
var Auth = require('./auth');
var path = require('path');
var chalk = require('chalk');
var util = require('util');
var Client = require('./client');
var exec = require('child-process-promise').exec;
var Q = require('q');

exports.remote = {};

exports.remote.add = function(appUrl) {
  var repoDir = process.cwd();
  var url;

  return Q.when(Auth.getCredentials())

  .then(function(cred) {
    return appHttpUrl(appUrl, cred);
  })
  .then(function(_url) {
    url = _url;
    return exec(util.format('git remote add canner %s', url));
  })
  .then(function(result) {
    return url;
  });
}

exports.clone = function(appUrl) {
  var gitpath = './' + appUrl;
  var repoDir = path.resolve(process.cwd(), gitpath);
  var url;

  return Q.when(Auth.getCredentials())

  // get cred, and clone
  .then(function(cred) {
    return appHttpUrl(appUrl, cred);
  })
  .then(function(_url) {
    url = _url;
    return exec(util.format('git clone %s', url));
  })
  .then(function(result) {
      var cmd = util.format('cd %s && git remote add canner %s', repoDir, url);
      return exec(cmd);
  })
  // add canner remote
  .then(function(result) {
    return {
      url: url,
      path: repoDir,
      name: appUrl
    };
  })
}

exports.push = function(appUrl) {
  var repoDir = process.cwd();
  var url;

  return Q.when(Auth.getCredentials())

  // get cred
  .then(function(cred) {
    return appHttpUrl(appUrl, cred);
  })
  // get and set new gitUrl
  .then(function(gitUrl) {
    return exec(util.format('cd %s && git remote set-url canner %s', repoDir, gitUrl));
  })
  // push
  .then(function(result) {
    return exec(util.format('cd %s && git push canner master', repoDir));
  });
}


function appHttpUrl(appUrl, cred) {
  return Client.getGitToken(appUrl, cred)
    .then(function(rep) {
      return util.format('http://%s/%s/%s.git', Helper.git_host, rep.gitToken, appUrl);
    });
}
