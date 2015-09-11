# canner

[![Build Status](https://travis-ci.org/Canner/canner.svg?branch=master)](https://travis-ci.org/Canner/canner)

A static webpage generator based on template engines, which aimed to deal with the maintenance difficulties between data and webpages.

We isolate all the text from files so people can maintain their websites more easily, we also work hard on lower the barriers for different fields of people to collaborate with ease.

Canner seperate data from html, like handlebars, nunjucks. But we provide template themes and output your website easily.

## Table of Contents.

- [How do canner works](#how-do-canner-works)
- [How to install](#how-to-install)
- [Learn More](#learn-more)
- [License](#license)

## How do canner works

Every canner project will have a configuration file called `canner.json` this file will setup the whole project.

First of all, there are three main settings `layout`, `filename`, `data`, here is a sample below. In `layout` we set to `index.hbs`, `index.hbs` is a [Handlebar](http://handlebarsjs.com/) template, which we will render all values in `data` to the template. `filename` is a setting, which is your output filename.

`canner.json`:

```js
{
  "layout": "./index.hbs",
  "filename": "output.html",
  "data": {
    "title": "Canner!!",
    "body": "hello world"
  }
}
```

`index.hbs`:

```html
<html>
  <head>
    <title>
      {{title}}
    </title>
  </head>

  <body>
    {{body}}
  </body>
  
</html>
```

**Result:**

`output.html`

```html
<html>
  <head>
    <title>
      Canner!!
    </title>
  </head>

  <body>
    hello world
  </body>
  
</html>
```
## How to install

```
sudo npm install -g canner
```

## Learn more

- [API Reference](https://github.com/Canner/canner/wiki/API-Reference)
- [Usage](https://github.com/Canner/canner/wiki/Usage)
- [Projects built by canner](https://github.com/Canner/canner/wiki/Projects-built-by-canner)
- [Template engines](https://github.com/Canner/canner/wiki/Template-engines)
- [What is a can](https://github.com/Canner/canner/wiki/What-is-a-can)
- [What's more](https://github.com/Canner/canner/wiki/What's-more)

## License

MIT
