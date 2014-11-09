### General

```
Usage: docgr [options] [command]

  Commands:

    init [source_dir]             Create initial files and folders
    build [options] [docgr.json]  Build a docgr from a docgr.json

  Options:

    -h, --help     output usage information
    -V, --version  output the version number
```

### "build" command

```
Usage: build [options] <source to docgr.json, default ./docgr.json>

  Options:

    -h, --help                output usage information
    -o, --output <directory>  Path to output directory, defaults to current directory
    -s, --serve <directory>   Path you want to start a local server. Default port 4000 for specific port use option -p
    -p, --port <port number>  Port which your local server start.
```

for example:

```
$ docgr build doc/docgr.json -o output -s 3333
```

### "watch" command

To monitoring all the files change, create, modify. If there any changes it will rebuild the whole project.

```
Usage: watch [options] <source to docgr.json, default ./docgr.json>

  Options:

    -h, --help                output usage information
    -o, --output <directory>  Path to output directory, defaults to current directory
    -s, --serve <directory>   Path you want to start a local server. Default port 4000 for specific port use option -p
    -p, --port <port number>  Port which your local server start.
```

for example:

```
$ docgr watch doc/docgr.json -o output -s 3333
```

### "inline" command

Building the html into a single html file. Detail usage: https://github.com/Docgr/inline

```
  Usage: inline [options] <source to your html, default ./index.html>

  Options:

    -h, --help                 output usage information
    -m, --minifyall            Minify css, html, js, images.
    -o, --output <directory>   Path to output directory, defaults to current directory
    -n, --filename <filename>  Output html file name, default to output.html
```

for example:

```
$ docgr inline doc/index.html -m
```