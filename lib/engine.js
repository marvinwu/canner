var path = require('path');

var hbs = require('handlebars');
var nun = require('nunjucks');

// render handlebars layout
var hbsLayout = function(content, html, dir, helpers) {
  var source = html;
  if(helpers) {
    hbs = require(path.resolve(dir, helpers));
  }
  var temp = hbs.compile(source);
  var layoutHtml = temp(content)

  return layoutHtml;
}

var nunLayout = function(content, html, dir) {
	var source = html;
  var layoutHtml = nun.renderString(source, content);

  return layoutHtml;
}


module.exports = {
	hbsLayout: hbsLayout,
	nunLayout: nunLayout
}
