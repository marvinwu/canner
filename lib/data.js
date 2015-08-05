var Auth = require('./auth');
var Q = require('q');
var fs = require("fs");
var path = require('path');
var Apps = require('./apps');
var Client = require('./client');


exports.push = function(appUrl, datas) {
  // auth
  // first authorize by netrc, no file -> ask
  return Q.when(Auth.getCredentials())
    // push json data
    // readfile
    .then(function(cred) {
      // post json update
      return Client.writeAppData(appUrl, cred, datas);
    })
}

exports.pull = function(appUrl) {
  // auth
  // first authorize by netrc, no file -> ask
  return Q.when(Auth.getCredentials())

  // pull json data
  .then(function(cred) {
    return Client.readAppData(appUrl, cred);
  })
}