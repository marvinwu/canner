canner also support rendering multipule page in a single `canner.json` file. The usage is also really simple.

For rendering one page:

```
{
    // layout
    layout: "./layout.hbs",
    filename: "page1.html",
    basic: {
        ...
    }
}
```

For multiple pages, just set a array inside `canner.json`

```

[
    {
        // layout
        layout: "./layout.hbs",
        filename: "page1.html",
        basic: {
            ...
        }
    },

    {
        // layout
        layout: "./layout.hbs",
        filename: "page2.html",
        basic: {
            ...
        }
    }
]
```

multiple pages is really helpful, while you are making a multiple language webpage.