A sample `docgr.json`

```js
{
    // necessary, point to your layout (handlebars)
    "layout": "./template/default.hbs",

    // necessary
    "basic": {
        // the objects are optional, according to your layout (render by handlebars).
        "title": "Docgr",
        "og_title": "Docgr",
        "og_site_name": "Docgr - a one page webpage generater",
        "og_url": "docgr.datagarage.io",
        "og_description": "This is a one page webpage generater",
        "og_image": "./image/header-logo-xs.png",
        "charset": "UTF-8",
        "author": "chilijung",
        "viewport": "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no",
        "shortcut_icon": "https://dl.dropboxusercontent.com/u/28663689/dg/favicon%20%281%29.ico",

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

        // necessary, block should be a array and contain with title, anchor, md..., each array is a top level topic of the list, sub object contains the sub subject in the topic.
        "block": [

            // topic 1
            {
                "title": "Docgr",
                "anchor": "basic",

                // necessary `docgr` will automatically convert md to html.
                "md": "./md/basic.md",

                "sub": [

                    // sub-title 1
                    {
                        "title": "Introduction",
                        "anchor": "intro",
                        // necessary. `docgr` will automatically convert md to html. 
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