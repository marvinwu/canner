# canner

[![Build Status](https://travis-ci.org/Canner/canner.svg?branch=master)](https://travis-ci.org/Canner/canner)

A static webpage generator based on template engines, which aimed to deal with the maintenance difficulties between data and webpages.

We isolate all the text from files so people can maintain their websites more easily, we also work hard on lower the barriers for different fields of people to collaborate with ease.

Canner seperate data from html, like handlebars, nunjucks. But we provide template themes and output your website easily.

## Table of Contents.

- [How do canner works](#how-do-canner-works)
- [How to install](#how-to-install)
- [See more](#see-more)
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

## See more
[Canner Wiki](https://github.com/Canner/canner/wiki)

## License

MIT
