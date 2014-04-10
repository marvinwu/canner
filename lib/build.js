var path = require('path');
var Q = require('q');
var _ = require('lodash');
var fs = require('fs');
var stage = require('node-stage');

var generate = require("./generate");

var buildFn = function(dir, options) {
    var deferred = Q.defer();

    dir = dir || process.cwd();
    outputDir = options.output || path.join(dir, '_web');

    stage.process('Starting build ...');

    generate.doc(dir, outputDir);
    
};

module.exports = {
    folder: buildFn
};
