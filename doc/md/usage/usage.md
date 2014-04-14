Using `docgr` to generate your one page webpage you will have create a file called `docgr.json`

The main two key in the object is `layout`, `filename`, `basic`.

### Layout

---

Layout is a `handlebars` file format. see more in handlebars official site. http://handlebarsjs.com/ . 


### Filename

---

Filename will be the output html file name. Default to `index.html`.


### Basic

---

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

### Something more

----
#### **markdown support!**

You can use `<markdown></markdown>` tag in your handlebars file. Inside the tag you can write your markdown language the generator will replace the tag into html format.

For example:

```
<markdown>
# Docgr
## subtitle
</markdown>
```

will convert to 

```
<h1> Docgr</h1>
<h2> subtitle</h2>
```

You can also use `src` attribute to include a `markdown` file

like:

```
<markdown src="test.md"></markdown>
```