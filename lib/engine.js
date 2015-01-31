var path = require('path');

var hbs = require('handlebars');

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


module.exports = {
	hbsLayout: hbsLayout
}
