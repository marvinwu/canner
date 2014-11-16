A sample `canner.json`

```js
{
    // necessary, point to your layout (handlebars)
    "layout": "./template/default.hbs",
    "filename": "index.html",

    // necessary, values render into handlbars
    "basic": {

        "scripts": [
            "https://code.jquery.com/jquery-1.11.0.min.js"
        ],

        "stylesheets": [
            "http://netdna.bootstrapcdn.com/bootstrap/3.1.1/css/bootstrap.min.css",
            "./index.css"
        ],

        "logo_img": "./image/header-logo-xs.png",

        "github_link": "https://github.com/DataGarage/open-data-license",

        "google_analytics": {
            "UA": "UA-49242122-1", 
            "url": "datagarage.io"
        },
        "block": [

            // topic 1
            {
                "title": "canner",
                "anchor": "basic",

                // necessary `canner` will automatically convert md to html.
                "md": "./md/basic.md",

                "sub": [

                    // sub-title 1
                    {
                        "title": "Introduction",
                        "anchor": "intro",
                        // necessary. `canner` will automatically convert md to html. 
                        "md": "./md/intro.md"
                    },
                    // sub-title 2
                    {
                        "title": "Usage",
                        "anchor": "usage",
                        "md": "./md/usage.md"
                    }
                ]
            },
            // topic 2
            {
                "title": "License",
                "anchor": "license",
                "md": "./md/license.md"
            }
        ]
    }
    
}
```

you can have a look into `doc` folder for further sample.