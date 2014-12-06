var hbs = require('handlebars');

hbs.registerHelper('agree_button', function() {
  var emotion = hbs.escapeExpression(this.emotion),
      name = hbs.escapeExpression(this.name);

  return new hbs.SafeString(
    "<button>I agree. I " + emotion + " " + name + "</button>"
  );
});

module.exports = hbs;