var Auth = require('./auth');
var Q = require('q');
var Client = require('./client');
var rp = require('request-promise');
var Helper = require('./helper');
var chalk = require('chalk');
var util = require('util');
var path = require('path');
var exec = require('child-process-promise').exec;

var throwErr = function(err) {
  console.log(err);
}

exports.create = function(appUrl) {
  var credentials;
  var app;
  var repoDir = path.join(process.cwd(), appUrl);
  // first authorize by netrc, no file -> ask
  return Q.when(Auth.getCredentials())

  // create an app
  // post to /apps
  .then(function(_credentials) {
    credentials = _credentials;
    return Client.createApp(appUrl, credentials);
  })

  .then(function(_app) {
    app = _app;
    return Client.openDevelopMode(appUrl, credentials);
  })

  // http url, ssh will support in the future
  // I now have no idea how to scale public_key
  // open repo
  .then(function() {

    return exec(util.format('mkdir %s && cd %s && git init', repoDir, repoDir));
  })

  .then(function(result) {
    return Client.getGitToken(app.url, credentials);
  })

  .then(function(repo) {
    // add git url
    // url: http://git.canner.io/<app.url>.git
    app.url = 'http://' + Helper.git_host + '/' + repo.gitToken + '/' + app.url + '.git';
    return exec(util.format('cd %s && git remote add canner %s', repoDir, url));
  })
  .then(function(result) {
    return app; 
  })
}

exports.deploy = function(appUrl) {
  return Q.when(Auth.getCredentials())

  // deploy an app
  .then(function(credentials) {
    return Client.deployApp(appUrl, credentials);
  })
}

// get appUrl from git remote in local
exports.getUrl = function(appUrl) {
  // return appUrl
  if (appUrl)
    return Q(appUrl);

  // else find from git remote
  return exec('git config --get remote.canner.url')
    .then(function(result) {
    // alphanumeric character including the underscore
    // also dash
    // followed by .git
    //console.log(stdout);
    var stdout = result.stdout;
    var stderr = result.stderr;
    var regex = /[\w\-]+(?=\.git)/g;
    var url = stdout.match(regex)[0];
    return url;
  })
}

// list my apps
exports.list = function() {
  // first authorize by netrc, no file -> ask
  return Q.when(Auth.getCredentials())

  // create an app
  // post to /apps
  .then(function(credentials) {
    return Client.listApps(credentials);
  })
}

// show an app
exports.info = function(appUrl) {
  // first authorize by netrc, no file -> ask
  return Q.when(Auth.getCredentials())

  // show an app
  // get to /apps/:url
  .then(function(credentials) {
    return Client.getApp(appUrl, credentials);
  })
}

// destory app
exports.destory = function(appUrl) {
  var app;
  // first authorize by netrc, no file -> ask
  return Q.when(Auth.getCredentials())

  // destory an app
  // delete to /apps
  .then(function(credentials) {
    return Client.destroyApp(appUrl, credentials);
  })
}


// show members
exports.getMembers = function(appUrl) {
  // first authorize by netrc, no file -> ask
  return Q.when(Auth.getCredentials())

  // show app members
  // get to /:url/members
  .then(function(credentials) {
    return Client.getMembers(appUrl, credentials);
  })
}

// add member
exports.addMember = function(appUrl, username, role) {
  // first authorize by netrc, no file -> ask
  return Q.when(Auth.getCredentials())

  // add domain
  // put to /apps/:url
  .then(function(credentials) {
    return Client.addMember(appUrl, username, role, credentials);
  })
}

// remove member
exports.removeMember = function(appUrl, username) {
  // first authorize by netrc, no file -> ask
  return Q.when(Auth.getCredentials())

  // add domain
  // put to /apps/:url
  .then(function(credentials) {
    return Client.removeMember(appUrl, username, credentials);
  })
}


// add domain
exports.addDomain = function(appUrl, domain) {
  // first authorize by netrc, no file -> ask
  return Q.when(Auth.getCredentials())

  // add domain
  // put to /apps/:url
  .then(function(credentials) {
    return Client.addDomain(appUrl, domain, credentials);
  })
}

// add domain
exports.removeDomain = function(appUrl, domain) {
  // first authorize by netrc, no file -> ask
  return Q.when(Auth.getCredentials())

  // remove domain
  // put to /apps/:url
  .then(function(credentials) {
    return Client.removeDomain(appUrl, domain, credentials);
  })
}

//set configs
exports.Configs = {};
exports.Configs.set = function(appUrl, configs) {
  return Q.when(Auth.getCredentials())

  .then(function(credentials) {
    return Client.setAppConfigs(appUrl, credentials, configs);
  })
}

exports.Configs.get = function(appUrl) {
  return Q.when(Auth.getCredentials())

  .then(function(credentials) {
    return Client.getApp(appUrl, credentials);
  }, throwErr)

  .then(function(app) {
    return app.canner;
  })
}
