var rp = require('request-promise');
var url = require('url');
var util = require('util');
var _ = require('lodash');

// constant in helper
var helper = require('./helper');
var host = helper.host;

// greeting when login, and test
// ping to server
exports.greeting = function(credentials) {
  // get_user_info to validate
  return httpReq('/ping', 'GET', credentials);
}


// create an app
// url is optional
exports.createApp = function(appUrl, credentials) {
  return httpReq('/apps', 'POST', credentials, {
    body: {
      url: appUrl
    }
  });
}

// get app info
exports.getApp = function(appUrl, credentials) {
  return httpReq('/apps/' + appUrl, 'GET', credentials);
}

// list apps
exports.listApps = function(credentials) {
  return httpReq('/apps/me', 'GET', credentials);
}


// deploy app
exports.deployApp = function(appUrl, credentials) {
  return httpReq(util.format('/apps/%s/deploy', appUrl), 'GET', credentials);
}

// destroy app
exports.destroyApp = function(appUrl, credentials) {
  return httpReq('/apps/' + appUrl, 'DELETE', credentials);
}

// get app members
exports.getMembers = function(appUrl, credentials) {
  return httpReq('/apps/' + appUrl + '/members', 'GET', credentials);
}

// post add member
exports.addMember = function(appUrl, userID, role, credentials) {
  return httpReq('/apps/' + appUrl + '/members', 'POST', credentials, {
    body: {
      userID: userID,
      role: role
    }
  });
}

// delete remove member
exports.removeMember = function(appUrl, userID, credentials) {
  return httpReq('/apps/' + appUrl + '/members/' + userID, 'DELETE', credentials);
}


// put app, add domain
exports.addDomain = function(appUrl, domain, credentials) {
  return httpReq('/apps/' + appUrl, 'PUT', credentials, {
    body: {
      addDomains: domain
    }
  });
}

// put app, remove domain
exports.removeDomain = function(appUrl, domain, credentials) {
  return httpReq('/apps/' + appUrl, 'PUT', credentials, {
    body: {
      delDomains: domain
    }
  });
}

// get data
exports.readAppData = function(appUrl, credentials) {
  return httpReq(util.format('/apps/%s/content', appUrl), 'GET', credentials);
}

exports.writeAppData = function(appUrl, credentials, data) {
  return httpReq(util.format('/apps/%s/content', appUrl), 'PUT', credentials, {
    body: data
  });
}

exports.getUserToken = function(user, pass) {
  var tokenUrl = url.resolve(host, '/users/me/token');
  return rp({
    uri: tokenUrl,
    method: 'GET',
    auth: {
      'user': user,
      'pass': pass,
    },
    json: true
  })
}

exports.setAppConfigs = function(appUrl, credentials, configs) {
  return httpReq(util.format('/apps/%s/configs', appUrl), 'PUT', credentials, {
    body: configs
  });
}

function httpReq(destUrl, method, credentials, obj) {
  var _url = url.resolve(host, destUrl);
  var opts = {
    uri: _url,
    method: method,
    auth: {
      'user': credentials.username,
      'pass': credentials.token
    },
    json: true
  }
  if (obj)
    opts = _.merge(opts, obj);

  return rp(opts);
}