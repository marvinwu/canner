# docgr

One page website generator

see document in : http://docgr.datagarage.io

## Document

If you want to update the document (document is also generate by Docgr!)

```
sudo npm install -g docgr
```

enter `doc` folder and enter

#### Building docgr

```
$ docgr build doc/docgr.json -o output -s 3333
```


#### Watching docgr

```
$ docgr watch doc/docgr.json -o output -s 3333
```


#### Building inline html in docgr

```
$ docgr inline doc/index.html -m
```

## Gh-pages


this will rebuilt the documents. To deploy to gh-pages, we are using subtree, enter command below to deploy.

```
git subtree push --prefix doc origin gh-pages
```

## Projects built by docgr

- http://opendata.datagarage.io
- http://type.datagarage.io
- http://123.g0v.today
- http://docgr.github.io/docgr
- http://docgr.github.io/pagefoldr
- http://rpkg.datagarage.io



## License

MIT [@chilijung](http://github.com/chilijung)
