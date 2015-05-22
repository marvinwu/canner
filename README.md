# canner

[![Build Status](https://travis-ci.org/Canner/canner.svg?branch=master)](https://travis-ci.org/Canner/canner)

A static webpage generator based on template engines, which aimed to deal with the maintenance difficulties between data and webpages.

We isolate all the text from files so people can maintain their websites more easily, we also work hard on lower the barriers for different fields of people to collaborate with ease.

Canner seperate data from html, like handlebars, nunjucks. But we provide template themes and output your website easily.

## Table of Contents.

- [How do canner works](#how-do-canner-works)
- [Template engine supports](#template-engines)
- [How to install](#how-to-install)
- [Command](#command)
  - [Building canner](#building-canner)
  - [Watching canner](#watching-canner)
- [What is a can](#what-is-a-can)
  - [Getting a can](#getting-a-can)
  - [Create template via can](#create-template-via-can)
  - [.canignore](#canignore)
- [Try a sample](#try-a-sample)
- [Can List](#can-list)
- [Build Your own can](#build-your-own-can)
  - [Open issue for can support](#open-issue-for-can-support)
- [Gh-pages](#gh-pages)
- [API](#api)
  - [create](#create)
  - [build](#build)
  - [watch](#watch)
  - [allin](#allin)
  - [login](#login)
  - [logout](#logout)
  - [apps.create](#apps.create)
  - [apps.deploy](#apps.deploy)
  - [apps.list](#apps.list)
  - [data.push](#data.push)
  - [data.pull](#data.pull)
- [What's more](#whats-more)
  - [Multipule page](#multipule-page)
  - [Support markdown](#support-markdown)
  - [Support hbs helpers](#support-hbs-helpers)
  - [Setting in YAML, js](#setting-in-yaml-js)
  - [Install themes](#install-themes)
  - [Building all js, css and images into html in canner](#building-all-js-css-and-images-into-html-in-canner)
- [Projects built by canner](#projects-built-by-canner)
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

And let's it! Work like a charm!

## Template engines

We support some popular template engines, like

- [handlebars](http://handlebarsjs.com/)
- [nunjucks](http://mozilla.github.io/nunjucks/) 
- [jade](http://jade-lang.com/)
- [swig](https://github.com/paularmstrong/swig)
- [mustache](https://github.com/janl/mustache.js)
- [dustjs](https://github.com/linkedin/dustjs)

You can use any of these template engines while you are [Building canner](#building-canner)!

## How to install

```
sudo npm install -g canner
```

## Command


```
  Usage: canner [options] [command]

  Commands:

    create [options] [source_dir]  Create initial files and folders, under a directory.
    build [options] [canner.json]  Build a canner from a canner.json
    watch [options] [canner.json]  Watching any changes in a canner and recompiled
    allin [options] [htmlfile]     Make html include files all warp allin

  Options:

    -h, --help     output usage information
    -V, --version  output the version number
```

### Building canner

To build `canner` to a folder use the following command. 

```
$ canner build doc/canner.json -o output -s ./ -p 3333
```

The command above means canner will build the configuration in `doc/canner.json` to directory `output` and serve a local server at port 3333, so you can look at your site http://localhost:3333

More options:

```
  Usage: build [options] <source to canner.json, default ./canner.json>

  Options:

    -h, --help                      output usage information
    -o, --output <directory>        Path to output directory, defaults to current directory
    -s, --serve <directory>         Path you want to start a local server. Default port 4000 for specific port use option -p
    -e, --engine <template engine>  Choose a template engine. Default engine "handlebars"
    -p, --port <port number>        Port which your local server start.
```

### Watching canner

`Watch` command do the same action as `build` but keep monitor the whole `doc` folder, if any file in the folder create, change, delete the whole project will recompile.

```
$ canner watch doc/canner.json -o output -s 3333
```

## What is a can

`Can` are use in generating templates in `canner`, which allow you immidiately generate some popular templates.

### Getting a can

Find the can you want and install in global via npm.

```
$ npm install -g sample-can
```

And it is done!

### Create template via can

To immidiately create a template via canner is super easy. If you want to generate a template from `sample-can`, you can just enter command below.

```
$ canner create  -g sample testfolder
```

**NOTE** : `-g` stands for `--generater`

This will create a folder called `testfolder`, which will include all templates from `sample-can`


### .canignore

If you want some files that should be ignore, while initialize canner projects just add `.canignore` file.

`.canignore`:

```
  test
  test.html
```

`Canner` will ignore file `test`, and `test.html`.

**NOTE**: canner will default ignore package.json, and dot files.


## Try a sample

Install `sample-can` https://github.com/Canner/sample-can

```
$ npm install -g sample-can
```

Create `sample-can` template in `canner`

```
$ canner create -g sample sample-folder
```

Enter `sample-folder`

```
$ cd sample-folder
```

Building `canner.json`

```
$ canner build canner.json
```

You are all done! see `./index.html` for the results.


## Can List

- https://github.com/Canner/fullPage-can

## Build Your own can

Here is a sample of a can:

https://github.com/Canner/sample-can

A can should be registered in npm, the module name should be something like `*-can`, for example `sample-can`, `fullpage-can`, etc... .  And can must have a file called `canner.json`.

### Open issue for can support

Please go to https://github.com/Canner/canner/issues/new , and open an issue with a `can support`.

## API
### require
``` javascript
var canner= require('canner');
```

### Create
Create initial files and folders, under a directory.

return a promise 

``` javascript
canner.create(dir, generator)
      .then(function(){
          // do your stuff
      })
      .catch(function(err){
          // deal with error
      });
```
##### parameters
* {string} dir - directory install canner
* {string} generator - Inital generate the generator that you are finding


### Build
Build a canner from a canner.json

return a promise 

``` javascript
canner.build(dir, options)
      .then(function(){
          // do your stuff
      })
      .catch(function(err){
          // deal with error
      });;
```
##### parameters
* {string} dir - source to canner.json, default ./canner.json
* {object} options
  * output- output dir
  * engine- Your template engine
  * data- if you want to put your own object intead of data in canner.json, and return html back, instead of write to file


### watch
Watching any changes in a canner and recompiled

return a promise 

``` javascript
canner.watch(dir, options);
```
##### parameters
* {string} dir - source to canner.json, default ./canner.json
* {object} options
  * output- output dir
  * port-  Port which your local server start.
  * serve- Path you want to start a local server. Default port 4000
  * engine- Your template engine

### allin
Make html include files all warp allin

``` javascript
canner.allin(htmlfile, options);
```
##### parameters
* {string} htmlfile - source to your html, default ./index.html
* {object} options
  * filename {String} Output html file name, default to output.html
  * output {String} Path to output directory, defaults to current directory
  * minifyall {Boolean}- minify css, html, js, images or not

### login
login to canner server, save username and token in .netrc

``` javascript
auth.login().then(function (body) {
      console.log('welcome '+body.username+'!');
    })
```

### logout
logout from canner server, delete host from netrc

``` javascript
auth.logout().then(function (body) {
      console.log('successfully logout!');
    })
```

### apps.create
create app in canner website

``` javascript
apps.create(appUrl).then(function (app) {
      // print success
      // show git url
      console.log('create app successfully!');
      console.log('Name: '+app.url);
      console.log('Git url: '+app.gitUrl);
    })
```

### apps.deploy
deploy app on canner server

``` javascript
apps.deploy(appUrl).then(function(){
  // success
})
```

### apps.list
list my apps on canner server

``` javascript
apps.list()
    .then(function (body) {
      console.log(body)
    })
```

### data.push
push datas to canner app

``` javascript
var datas= { title: 'title', name: 'joe' };
data.push(appUrl, datas).then(function(){
  // success
})
```

### data.pull
pull data from app on canner website

``` javascript
data.pull(appUrl).then(function(datas){
  // print datas
  console.log(datas);
})
```

### What's more



#### Multipule page

Canner also support rendering multipule webpages in a single setting file. For instance (exmaple below)

`canner.json`:

```json
[{
  "layout": "./index.hbs",
  "filename": "output.html",
  "data": {
    "title": "Canner!!",
    "body": "This is file 1"
  }
},{
  "layout": "./index.hbs",
  "filename": "output2.html",
  "data": {
    "title": "Canner!!",
    "body": "This is file 2"
  }
}]
```

In this setting, `canner` will output two files, one is `output.html`, `output2.html`. And will render with the data they carry in the object.

#### Support markdown

We also support markdown rendering in a html. just add `data-markdown` attribute to your dom. 

Loading from source: 

```html
<section data-markdown="./test.md">
</section>
```

Compile the section in md:

```html
<section data-markdown>
  wow
    - wow1
    - wow2
</section>
```

See more in here: https://github.com/Canner/md-attr#usage

#### Support hbs helpers

Add a field called `helpers` in your configure file. Such as

`canner.json`

```js
{
  "layout": "index.hbs",
  "filename": "index.html",
  "helpers": "helper.js",
  "data": {
    "title": "test",
    "items": [
      {"name": "Handlebars", "emotion": "love"},
      {"name": "Mustache", "emotion": "enjoy"},
      {"name": "Ember", "emotion": "want to learn"}
    ]
  }
}
```

`index.hbs`

```html
<html>
  <head>

  </head>
  <body>
    {{title}}
    <ul>
      {{#each items}}
      <li>{{agree_button}}</li>
      {{/each}}
    </ul>
  </body>
</html>
```

`helper.js`

```js
var hbs = require('handlebars');

hbs.registerHelper('agree_button', function() {
  var emotion = hbs.escapeExpression(this.emotion),
      name = hbs.escapeExpression(this.name);

  return new hbs.SafeString(
    "<button>I agree. I " + emotion + " " + name + "</button>"
  );
});

module.exports = hbs;
```

**Result**:

```html
<html>
  <head>

  </head>
  <body>
    test
    <ul>
      <li><button>I agree. I love Handlebars</button></li>
      <li><button>I agree. I enjoy Mustache</button></li>
      <li><button>I agree. I want to learn Ember</button></li>
    </ul>
  </body>
</html>
```


#### Setting in YAML, js

Settings in canner can be json, yaml, and also js.

In `yaml`:

```yaml
layout: "index.hbs"
filename: "index.html"
data:
  title: "test"
  items:
    -
      name: "Canner yaml"
      emotion: "want to learn"
```

In `js`:

```js

module.exports= {
  intro: require("./intro.json"),
  qanda: require("./qanda.json")
}
```

#### Install themes

Canner support some useful themes that you can immidiately build your project.

Please go to section [What is a can](#what-is-a-can)


#### Building all js, css and images into html in canner

The following command will make scripts(js), styles(css), images all wrap up in a single html file, which is useful when you are ready for deploying. After wrapping up, you can just deploy one html file!

```
$ canner allin doc/index.html -m
```

**NOTE**: `-m` stands for `--minify`

see more docs: https://github.com/Canner/allin

## Projects built by canner

- http://opendata.datagarage.io
- http://type.datagarage.io
- http://123.g0v.today
- http://canner.github.io/canner
- http://canner.github.io/pagefoldr
- http://rpkg.datagarage.io


## License

MIT

## todo
- [ ] ssl support
