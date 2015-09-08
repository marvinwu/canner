# canner

[![Build Status](https://travis-ci.org/Canner/canner.svg?branch=master)](https://travis-ci.org/Canner/canner)

A static webpage generator based on template engines, which aimed to deal with the maintenance difficulties between data and webpages.

We isolate all the text from files so people can maintain their websites more easily, we also work hard on lower the barriers for different fields of people to collaborate with ease.

Canner seperate data from html, like handlebars, nunjucks. But we provide template themes and output your website easily.

## Table of Contents.

- [How do canner works](#how-do-canner-works)
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
- [See more](#see-more)
- [Open issue for can support](#open-issue-for-can-support)
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

### See more
[Canner Wiki](https://github.com/Canner/canner/wiki)

### Open issue for can support

Please go to https://github.com/Canner/canner/issues/new , and open an issue with a `can support`.

## License

MIT
