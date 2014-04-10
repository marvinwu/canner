var hbs = require('handlebars');
var Q = require('q');
var fs = require('fs');
var path = require('path');

var docObj = {};


var doc = function(dir, output) {
	docObj.readJSON(dir).then(function(data) {
		// set docgr.json json into object.
		docObj.docgr = JSON.parse(data);

		// reading layout jade.
		return docObj.setLayout(dir, docObj.docgr.layout);
	}, function(err) {
		console.error('Can\'t find no docgr.json file.');
		console.log(err);
	})

	.then(function(data) {
		// the content of the html.
		var content = docObj.docgr.basic;
		// layout html
		var layoutHtml = data;

		// rendering layout with content.
		return docObj.renderLayout(content, layoutHtml)
	}, function(err) {
		console.error('Can\'t find layout page. Please check your settings.');
		console.error(err);
	})

	.then(function(layoutHtml) {
		console.log(layoutHtml);
	})
}

// Reading docgr.json file.
docObj.readJSON = function(dir) {
	var deferred = Q.defer();

	fs.readFile(path.join(dir, 'docgr.json'), {encoding: 'UTF-8'}, function(err, data) {
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