# docgr

One page website generator

see document in : http://docgr.github.io/docgr

## Document

If you want to update the document (document is also generate by Docgr!)

```
sudo npm install -g docgr
```

enter `doc` folder and enter

```
docgr ./docgr.json
```
this will rebuilt the documents. To deploy to gh-pages, we are using subtree, enter command below to deploy.

```
git subtree push --prefix doc origin gh-pages
```

## Projects build by docgr

- http://opendata.datagarage.io
- http://type.datagarage.io
- http://123.g0v.today
- http://docgr.github.io/docgr



## License

MIT [@chilijung](http://github.com/chilijung)
