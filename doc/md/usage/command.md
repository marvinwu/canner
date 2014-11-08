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