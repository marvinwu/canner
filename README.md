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
  - [logging in](#logging-in)
  - [logging out](#logging-out)
  - [create app](#create-app)
  - [destroy app](#destroy-app)
  - [push app](#push-app)
  - [deploy app](#deploy-app)
  - [list apps](#list-apps)
  - [info app](#info-app)
  - [open app](#open-app)
  - [members list app](#members-list-app)
  - [members add app](#members-add-app)
  - [members remove app](#members-remove-app)
  - [domains add app](#domains-add-app)
  - [domains remove app](#domains-remove-app)
  - [push data](#push-data)
  - [pull data](#pull-data)
  - [git remote add](#git-remote-add)
  - [git clone](#git-clone)
  - [gh deploy](#gh-deploy)
- [What is a can](#what-is-a-can)
  - [Getting a can](#getting-a-can)
  - [Create template via can](#create-template-via-can)
  - [.canignore](#canignore)
- [Try a sample](#try-a-sample)
- [Can List](#can-list)
- [Build Your own can](#build-your-own-can)
  - [Open issue for can support](#open-issue-for-can-support)
- [API](#api)
  - [init](#init)
  - [build](#build)
  - [watch](#watch)
  - [allin](#allin)
  - [login](#login)
  - [logout](#logout)
  - [apps.create](#appscreate)
  - [apps.deploy](#appsdeploy)
  - [apps.list](#appslist)
  - [data.push](#datapush)
  - [data.pull](#datapull)
  - [git.remote.add](#gitremoteadd)
  - [git.clone](#gitclone)
- [What's more](#whats-more)
  - [Multipule page](#multipule-page)
  - [Support markdown](#support-markdown)
  - [hbs helpers](#hbs-helpers)
  - [hbs partials](#hbs-partials)
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
    init [options] [source_dir]            initialize files and folders, under a directory.
    build [options] [canner.json]          build a canner from a canner.json
    watch [options] [canner.json]          watching any changes in a canner and recompiled
    allin [options] [htmlfile]             make html include files all warp allin
    login                                  login to use canner.io api
    logout                                 logout from canner.io api
    apps:create [app_url]                  create an app on canner.io
    apps:destroy [app_url]                 destroy an app on canner.io
    apps:push [options] [app_url]          push a local app to remote
    apps:deploy [app_url]                  deploy an app on canner.io
    apps:list                              list my apps
    apps:info [app_url]                    show the app's information
    apps:open [app_url]                    open default browser and navigate to the app
    apps:members:list [app_url]            list app members on canner.io
    apps:members:add [app_url] [username] [role]  add members to an app on canner.io
    apps:members:remove [app_url] [username]    remove members from an app on canner.io
    apps:domains:add [app_url] [domain]     add domain to an app on canner.io
    apps:domains:remove [app_url] [domain]  remove domain to an app on canner.io
    data:push [options] [app_url]          push data to app on canner.io
    data:pull [options] [app_url]          pull data from app on canner.io
    git:remote:add [app_url]               add remote url to local dir
    git:clone [app_url] [filepath]  clone a remote repo to local dir
    gh:deploy [options]                    deploy the output folder to gh-pages
    configs:set [params] [app_url]         set configs to app on canner.io
    configs:get [app_url]                  get configs of an app on canner.io

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

### logging-in

`login` command save the credentials for you, in order to interact with `canner.io` API

``` shellscript
$ canner login
> username  wwwy3y3
> password <hidden>
```

### logging-out
`logout` command delete the credentials on your computer

``` shellscript
$ canner logout
```

### create-app
`apps:create` create an app on `canner.io` server, and add git remote on you folder

``` shellscript
$ mkdir myproject && cd myproject
$ git init
$ canner apps:create myproject
> create app successfully!
> Name: myproject
> Git url: http://git.canner.io/myproject.git
$ git remote add canner http://git.canner.io/myproject.git
```
### push-app
`apps:push` push a local repo to remote, option `-d` specify your data path, default `canner.json`
``` shellscript
$ cd /path/to/myproject
$ canner apps:push
```

### deploy-app
`apps:deploy` deploy your app on `canner.io` server

``` shellscript
$ cd /path/to/myproject
$ canner apps:deploy
```

### list-apps
`apps:list` list your apps on `canner.io` server

``` shellscript
$ canner apps:list

```

### info-app
`apps:info` show your app's information.

``` shellscript
$ canner apps:info myproject
```

### open-app
`apps:open` open default browser and navigate to the app

``` shellscript
$ cd /path/to/myproject
$ canner apps:open
```

### domains-add-app
`apps:domains:add` add a custom domain your apps on `canner.io` server

```
$ canner apps:domains:add myproject www.domain.com
```

### domains-remove-app
`apps:domain:remove` remove a custom domain your apps on `canner.io` server

```
$ canner apps:domains:remove myproject www.domain.com
```

### members-list-app
`apps:members:list` show apps members on `canner.io` server

```
$ canner apps:members:list myproject
```
### members-add-app
`apps:members:add` add members to an app on `canner.io` server

```
$ canner apps:members:add jay developer
```
### members-remove-app
`apps:members:remove` remove members from an app on `canner.io` server

```
$ canner apps:members:remove jay
```

### destroy app
`apps:destroy` destroy your apps on `canner.io` server

```
$ canner apps:destroy myproject
```

### push-data
`data:push` push your local json data to server app, add option `-d` point to your data path, default to `./canner.json` data attribute

``` shellscript
$ cd /path/to/myproject
$ canner data:push -d /path/to/data.json
```

### pull-data
`data:pull` pull data from server app

#### print data on terminal
``` shellscript
$ cd /path/to/myproject
$ canner data:pull -p 
```

#### save data to file
``` shellscript
$ cd /path/to/myproject
$ canner data:pull -f /path/to/data.json
```

### git-remote-add
`git:remote:add` add app url git remote path for you

``` shellscript
$ cd /path/to/myproject
$ canner git:remote:add <app-url>
```
### git-clone
`git:clone` clone a remote repo to local

``` shellscript
$ cd /path/to/myproject
$ canner git:clone <app-url> <file_path>
```

### gh-deploy
`gh-deploy` deploy canner output folder to gh-pages

``` shellscript
$ canner gh:deploy -d <directory>
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
$ canner init  -g sample-can testfolder
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

Initialize `sample-can` template in `canner`

```
$ canner init -g sample-can sample-folder
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
### Env
if you want to send request to localhost, run `export CANNER_ENV='dev'`

### require
``` javascript
var canner= require('canner');
```

### Init
Create initial files and folders, under a directory.

return a promise 

``` javascript
canner.init(dir, generator)
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

### git.remote.add
add canner git remote url to local dir

``` javascript
git.remote.add(appUrl).then(function(){
  // success
})
```

### git.clone
clone a git remote app to local dir

``` javascript
git.clone(app).then(function() {
  // success
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

#### hbs helpers

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

##### also support multiple helpers in array
```js
{
  "layout": "index.hbs",
  "filename": "index.html",
  "helpers": ["helper.js", "the-other-helper.js"],
  // ...
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
module.exports= function(hbs){

  // your helpers
  hbs.registerHelper('agree_button', function() {
    var emotion = hbs.escapeExpression(this.emotion),
        name = hbs.escapeExpression(this.name);

    return new hbs.SafeString(
      "<button>I agree. I " + emotion + " " + name + "</button>"
    );
  });

}

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

#### hbs partials

Add a field called `partials` in your configure file. Such as

`canner.json`

```js
{
  "layout": "index.hbs",
  "filename": "index.html",
  "partials": "partial.js",
  "data": {
    "title": "test"
  }
}
```

##### also support multiple partials in array
```js
{
  "layout": "index.hbs",
  "filename": "index.html",
  "partials": ["partial.js", "the-other-partial.js"],
  // ...
}
```

`index.hbs`

```html
<html>
	<head>

	</head>
	<body>
		{{title}}

	  {{> person}}
	</body>
</html>

```

`partial.js`

```js

module.exports= function (hbs) {
	// register a partial
	hbs.registerPartial('person', '<div> this is a person </div>');

}


```

**Result**:

```html
<html>
	<head>

	</head>
	<body>
		test

		<div> this is a person </div>

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
- [ ] add tests
- [ ] refactor
- [ ] git problem
