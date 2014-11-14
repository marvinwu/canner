var path = require('path');
var Q = require('q');
var _ = require('lodash');
var localdir = require('localdir');
var fs = require('fs');
var stage = require('node-stage');
var watch = require('watch');

var generate = require("./generate");

var build = function(setting, options, watchOpt) {
    var deferred = Q.defer();

    output = options.args[1].output || process.cwd();
    port = options.args[1].port || 4000;
    serveDir = options.args[1].serve;

    
    if(serveDir !== undefined) {
    	localdir.serveDir(serveDir, port);
    	stage.success('Serving "' + serveDir + '" at http://localhost:' + port)
    }

    setting = setting || './canner.json';

    stage.process('Starting build ...');

    generate.doc(output, setting);

    if(watchOpt) {
        serveDir = serveDir ? serveDir: './';
        watchFs(serveDir, setting, output, options);
        stage.success('Watching files under "' + serveDir + '"....-o_o-')
    }
    
};

var watchFs = function(dir, setting, output, options) {
    var dir = path.resolve(dir);
    watch.createMonitor(dir, function (monitor) {
        monitor.on("created", function (f, stat) {
            // Handle new files
            stage.process("File " + f + " have been created... regenerate your awesome project...")
            generate.doc(output, setting);
        })
        monitor.on("changed", function (f, curr, prev) {
            // Handle file changes
            stage.process("File " + f + " have been changed... regenerate your awesome project...")
            generate.doc(output, setting);
        })
        monitor.on("removed", function (f, stat) {
            // Handle removed files
            stage.process("File " + f + " have been removed... regenerate your awesome project...")
            generate.doc(output, setting);
        })
    })
}


module.exports = {
    folder: build
};
