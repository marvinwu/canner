var core= require('canner-core');
var apps = require('./lib/apps');
var auth = require('./lib/auth');
var data = require('./lib/data');
var git = require('./lib/git');
var gh = require('./lib/gh');

// core api
exports.init = core.init;
exports.build = core.build;
exports.watch = core.watch;
exports.allin = core.allin;
exports.read = core.read;
exports.auth = auth;
exports.apps = apps;
exports.data = data;
exports.git = git;
exports.gh = gh;
