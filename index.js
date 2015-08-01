var _ = require('lodash');
var prog = require('commander');
var fileSave = require('file-save');
var allin_html = require('allin');
var path = require('path');
var Q = require('q');

var core= require('canner-core');

// core api
exports.init = core.init;
exports.build = core.build;
exports.watch = core.watch;
exports.allin = core.allin;
exports.read = core.read;