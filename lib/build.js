var path = require('path');
var Q = require('q');
var _ = require('lodash');
var fs = require('fs');
var stage = require('node-stage');

var generate = require("./generate");

var buildFn = function(setting, options) {
    var deferred = Q.defer();

    output = options.output || process.cwd();
    setting = setting || './docgr.json';

    stage.process('Starting build ...');

    generate.doc(output, setting);
    
};

module.exports = {
    folder: buildFn
};
