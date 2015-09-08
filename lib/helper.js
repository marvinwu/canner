var Table = require('cli-table');
var colors = require('colors/safe');
var _ = require('lodash');
var Client = require('./client');
var util = require('util');

// constant
// host
// in dev, export CANNER_HOST='http://local.host:3000'
var ENV = process.env.CANNER_ENV;
if (ENV == 'dev')
  var host = 'http://local.host:3000';
else if (ENV == 'test')
  var host = 'http://test.canner.io/';
else
  var host = 'http://www.canner.io/';
exports.host = host;

// domain
// in dev, export CANNER_DOMAIN='www.local.host'
// used for basicAuth
if (ENV == 'dev')
  var domain = 'www.local.host';
else if (ENV == 'test')
  var domain = 'test.canner.io';
else
  var domain = 'www.canner.io';
exports.domain = domain;

// git host
// use for git url
// in dev, export CANNER_GIT_HOST='git.local.host:3000'
if (ENV == 'dev')
  var git_host = 'git.local.host:3000';
else if (ENV == 'test')
  var git_host = 'git.test.canner.io';
else
  var git_host = 'git.canner.io';
exports.git_host = git_host;

if (ENV == 'dev')
  var app_host = 'localapp.host:3000';
else if (ENV == 'test')
  var app_host = 'testcannerapp.com';
else
  var app_host = 'cannerapp.com';
exports.app_host = app_host;

exports.table = function(datas, params) {
  // instantiate
  var table = new Table({
    head: params.head,
    colWidths: _.range(20, 20 + params.head.length, 0),
    style: {
      'padding-left': 1,
      'padding-right': 1,
      head: ['cyan'],
      border: ['grey'],
      compact: false
    }
  });

  datas.forEach(function(data) {
    var arr = [];
    params.column.forEach(function(property) {
      // add value of the property to arr
      arr.push(getColor(property, data[property]));
    });
    table.push(arr);
  });

  return table.toString();
}

function getColor(property, subject) {
  if (property === 'status') {
    if (subject === 'success') {
      return applyStyles(['green'], subject);
    } else {
      return applyStyles(['red'], subject);
    }
  }
  return subject;
}

// extend Table style
function applyStyles(styles, subject) {
  if (!subject)
    return '';
  styles.forEach(function(style) {
    subject = colors[style](subject);
  });
  return subject;
}

exports.appHttpUrl = function (appUrl, cred) {
  return Client.getGitToken(appUrl, cred)
    .then(function(rep) {
      return util.format('http://%s/%s/%s.git', git_host, rep.gitToken, appUrl);
    });
}

