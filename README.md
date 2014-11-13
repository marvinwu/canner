# canner

A static webpage generator based on handlebars.js, which aimed to deal with the maintenance difficulty between data and webpages.

see document in : http://canner.datagarage.io

## Document

If you want to update the document (document is also generate by canner!)

```
sudo npm install -g canner
```

enter `doc` folder and enter

#### Building canner

```
$ canner build doc/canner.json -o output -s 3333
```


#### Watching canner

```
$ canner watch doc/canner.json -o output -s 3333
```


#### Building all js, css and images into html in canner

```
$ canner inline doc/index.html -m
```

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

MIT [@chilijung](http://github.com/chilijung)
