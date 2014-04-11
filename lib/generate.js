var hbs = require('handlebars');
var Q = require('q');
var _ = require('lodash');
var fs = require('fs');
var path = require('path');
var md = require('./markdown');
var fs_save = require('file-save');

var docObj = {};


var doc = function(output, settings) {
	var content, layoutHtml;
	var dir = path.dirname(settings);

	function readSettings(cb) {

		docObj.readJSON(settings).then(function(data) {
			// set docgr.json json into object.
			try {
				docObj.docgr = JSON.parse(data);
			}catch(e) {
				console.error('docgr.json parse error.')
				console.error(e);
				process.exit(1);
			}

			if(docObj.docgr instanceof Array) {
				cb(docObj.docgr)
			}else {
				cb([docObj.docgr])
			}

			// reading layout jade.
		}, function(err) {
			console.error('Can\'t find no docgr.json file.');
			console.error(err);
			process.exit(3);
		})
	}
	
	readSettings(function(settings) {
		var count = 0;
		_(settings).forEach(function(page) {
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
				return docObj.setLayout(dir, page.layout);
			})
			.then(function(data) {
				// the content of the html.
				content = page.basic;
				// layout html
				layoutHtml = data;

				return md.build(dir, content)
			}, function(err) {
				console.error(err);
				process.exit(2);
			})

			.then(function() {
				// rendering layout with content.
				return docObj.renderLayout(content, layoutHtml)

			}, function(err) {
				console.error(err);
				process.exit(3);
			})

			.then(function(layoutHtml) {
				var fs_path = path.join(output, filename);
				fs_save(fs_path, layoutHtml, function() {
					console.log('file save to ' + fs_path)
				});
			})
		})
	})
}

// Reading docgr.json file.
docObj.readJSON = function(settings) {
	var deferred = Q.defer();

	fs.readFile(path.join(settings), {encoding: 'UTF-8'}, function(err, data) {
        if (err) {
            deferred.reject(new Error(err));
        } else {
            deferred.resolve(data);
        }
    })

    return deferred.promise;
}

// Reading layout.
docObj.setLayout = function(dir, layout) {
	var deferred = Q.defer();
	var layoutPath = path.resolve(dir, layout);

	fs.readFile(layoutPath, {encoding: 'UTF-8'}, function(err, layout) {
        if (err) {
            deferred.reject(new Error(err));
        } else {
            deferred.resolve(layout);
        }
    })

    return deferred.promise;
}

// render layout
docObj.renderLayout = function(content, html) {
	var source = html;
	var temp = hbs.compile(source);
	var renderHtml = temp(content);
	
	return renderHtml;
}


module.exports = {
	doc: doc
}