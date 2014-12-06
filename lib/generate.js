var hbs = require('handlebars');
var Q = require('q');
var _ = require('lodash');
var fs = require('fs');
var path = require('path');
var md = require('./markdown');
var fs_save = require('file-save');
var async = require('async');


// reading canner.json
var _readSettings = function(settings, cb) {

    var canner;

    _readJSON(settings).then(function(data) {
        canner = data;
        if(canner instanceof Array) {
            cb(canner)
        }else {
            cb([canner])
        }
    }, function(err) {
        console.error('Can\'t find no canner.json file.');
        console.error(err);
        process.exit(2);
    })
}

// Reading canner.json file.
var _readJSON = function(settings) {
    var d = Q.defer();

    //if js file
    if(settings.split('.').pop() == 'js'){
        var data= require(path.resolve(settings));
        d.resolve(data);
        return d.promise;
    }

   //json
    fs.readFile(path.join(settings), {encoding: 'UTF-8'}, function(err, data) {
        if (err) {
            d.reject(new Error(err));
        } else {
            //parse
            try {
                data = JSON.parse(data);
            }catch(e) {
                console.error('canner.json parse error.')
                console.error(e);
                process.exit(1);
            }

            //resolve
            d.resolve(data);
        }
    })

    return d.promise;
}


// Reading layout.
var _setLayout = function(dir, layout) {
    var d = Q.defer();
    var layoutPath = path.resolve(dir, layout);

    fs.readFile(layoutPath, {encoding: 'UTF-8'}, function(err, layout) {
        if (err) {
            d.reject(new Error(err));
        } else {
            d.resolve(layout);
        }
    })

    return d.promise;
}

// render layout
var _renderLayout = function(content, html) {
    var source = html;
    var temp = hbs.compile(source);
    var layoutHtml = temp(content)

    return layoutHtml;
}

// gnerating docs
var doc = function(output, settings, cb) {
    var dir = path.dirname(settings);

    _readSettings(settings, function(settings) {
        var count = 0;
        async.eachSeries(settings, function(page, cb) {
            if(page.filename) {
                var filename = page.filename
            }else {
                if(count !== 0) {
                    var filename = 'index' + count + '.html';
                }else {
                    var filename = 'index.html';
                }
                count++;
            }

            Q.fcall(function() {
                return _setLayout(dir, page.layout);
            })

            .then(function(data) {
                // rendering layout with content.
                var content = page.basic;
                var layoutHtml = data;
                return _renderLayout(content, layoutHtml)
            }, function(err) {
                console.error(err);
                process.exit(3);
            })

            .then(function(layoutHtml) {
                return md(layoutHtml, dir)
            }, function(err) {
                console.error(err);
                process.exit(4);
            })

            .then(function(buildHtml) {
                var fs_path = path.join(output, filename);

                fs_save(fs_path)
                    .write(buildHtml)
                    .end()
                    .finish(function() {
                        console.log('file save to ' + fs_path);
                        cb();
                    })
            }, function(err) {
                console.error(err);
                process.exit(5)
            })

        }, function(err) {
            if(err)
                cb(err);
            else
                cb(null);
        })
    })
}


module.exports = {
    doc: doc
}