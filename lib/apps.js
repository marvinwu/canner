var Auth = require('./auth');
var Q = require('q');
var Client = require('./client');
var rp = require('request-promise');
var NodeGit = require("nodegit");
var Helper = require('./helper');
var chalk = require('chalk');


exports.create = function(appUrl) {
  var credentials;
  var app;
  var repo;
  // first authorize by netrc, no file -> ask
  return Q.when(Auth.getCredentials())

  // create an app
  // post to /apps
  .then(function(_credentials) {
    credentials = _credentials;
    return Client.createApp(appUrl, credentials);
  })

  // http url, ssh will support in the future
  // I now have no idea how to scale public_key
  // open repo
  .then(function(_app) {
    app = _app;
    var repoDir = process.cwd();

    // init (path, is_bare)
    return NodeGit.Repository.init(repoDir + '/' + appUrl, 0);
  })

  .then(function(_repo) {
    repo = _repo;
    return Client.getGitToken(app.url, credentials);
  })

  .then(function(rep) {
    // add git url
    // url: http://git.canner.io/<app.url>.git
    var url = 'http://' + Helper.git_host + '/' + rep.hashToken + '/' +app.url + '.git';
    var remote = NodeGit.Remote.create(repo, "canner", url);
    app.gitUrl = remote.url();
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
  return NodeGit.Repository.open(process.cwd())
    .then(function(repo) {
      return NodeGit.Remote.lookup(repo, "canner");
    })

  .then(function(remote) {
    // alphanumeric character including the underscore
    // also dash
    // followed by .git
    var regex = /[\w\-]+(?=\.git)/g;
    var url = remote.url().match(regex)[0];
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

  // open repo
  .then(function(_app) {
    console.log(_app);
    app = _app;
    var repoDir = process.cwd();

    return NodeGit.Repository.open(repoDir + '/' + appUrl);
  })

  // remove remote
  .then(function(repo) {
    var remote = NodeGit.Remote.delete(repo, "canner");
    return app;
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
