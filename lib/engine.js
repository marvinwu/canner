var path = require('path');

var Q = require('Q');

var hbs = require('handlebars');
var nun = require('nunjucks');
var jade = require('jade');
var swig = require('swig');
var mus = require('mustache');
var dust = require('dustjs-linkedin');
var beautify = require('js-beautify').html_beautify;

// render handlebars layout
var hbsLayout = function(content, source, dir, helpers) {
	if(helpers) {
		hbs = require(path.resolve(dir, helpers));
	}
	var temp = hbs.compile(source);
	var layout_html = temp(content)

	return layout_html;
}

var nunLayout = function(content, source, dir) {
	var layout_html = nun.renderString(source, content);

	return layout_html;
}

var jadeLayout = function(content, source, dir) {
	var fn = jade.compile(source, {pretty: true});
	var layout_html = fn(content);

	return layout_html;
}

var swigLayout = function(content, source, dir) {
	var layout_html = swig.render(source, { locals: content});

	return layout_html;
}

var musLayout = function(content, source, dir) {
	var layout_html = mus.render(source, content);

	return layout_html
}

var dustLayout = function(content, source, dir) {
	var compiled = dust.compile(source, "canner");
	dust.loadSource(compiled);
	var d = Q.defer();

	dust.render("canner", content, function(err, out) {
	  if(err) {
	  	d.reject(new Error(err));
	  }else {
	  	var html = beautify(out);
	  	d.resolve(html);
	  }
	});

	return d.promise;
}


module.exports = {
	hbsLayout: hbsLayout,
	nunLayout: nunLayout,
	jadeLayout: jadeLayout,
	swigLayout: swigLayout,
	musLayout: musLayout,
	dustLayout: dustLayout
}
