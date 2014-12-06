# canner

A static webpage generator based on handlebars.js, which aimed to deal with the maintenance difficulty between data and webpages.

## Install

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


#### Building canner

```
$ canner build doc/canner.json -o output -s 3333
```


#### Watching canner

```
$ canner watch doc/canner.json -o output -s 3333
```

#### Get a can

Find the can you want and install in global via npm.

```
$ npm install -g sample-can
```

And it is done!

How to make a can: https://github.com/Canner/canner/blob/master/generator.md

Can list: https://github.com/Canner/canner/blob/master/generator.md#can-list

### Create template via can

To immidiately create a template via canner is super easy. If I want to generate a template from `sample-can`, I can just enter command below.

```
$ canner create  -g sample testfolder
```

This will create a folder called `testfolder`, which will include all templates from `sample-can`

#### Building all js, css and images into html in canner


```
$ canner allin doc/index.html -m
```

see more docs: https://github.com/Canner/allin

## Try a sample

Install `sample-can`

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



## Gh-pages


this will rebuilt the documents. To deploy to gh-pages, we are using subtree, enter command below to deploy.

```
git subtree push --prefix doc origin gh-pages
```

## Projects built by canner

- http://opendata.datagarage.io
- http://type.datagarage.io
- http://123.g0v.today
- http://canner.github.io/canner
- http://canner.github.io/pagefoldr
- http://rpkg.datagarage.io



## License

MIT
