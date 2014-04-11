Using `docgr` to generate your one page webpage you will have create a file called `docgr.json`

The main two key in the object is `layout`, `basic`.

#### Layout

Layout is a `handlebars` file format. see more in handlebars official site. http://handlebarsjs.com/ . 


#### Basic

Basic object is a object that you want to rendering into layout. 


For a basic example:

if you have a layout like

```
<input type="text" value="{{name}}">
```

in basic you put

```
name: chilijung
```

`docgr` will render it into 

```
<input type="text" value="chilijung">
```

#### Something more

Notice that in `basic` object there is a key name called `block`, in block `docgr` will find a key name called `md` (should be a route point to a markdown file). `docgr` will compile markdown to html and set value back to `md`.
