---
title: Eleventy Tricks
permalink: /blog/2021/{{ title | slug }}/
layout: blog-article-layout.njk
date: 2021-06-16
breadcrumbs:
    - label: Home
      url: /
    - label: Blog
      url: /blog/
    - label: Eleventy Tricks
tags:
  - posts
---

The more I use [Eleventy](https://11ty.dev) the more I'm enjoying it. Every day I find some new feature that makes my life easier (read: I thought I would have to implement it but somebody already had). The problem I was facing was that the hobby project I am working on to learn [Materialize](https://materializecss.com) is published on Github Pages and what is not initially apparent is that the root location ("/") is the directory above the deployment point.

```
account.github.io
|
+-- my-custom-project
    |
    +-- index.html      <---- home page
```

For things to show up correctly, all of the paths have to be relative (I thought) so I wrote a Javascript function in my .eleventy.js file to account for local development and production deployment. The trick there is to pass in the deployment environment as a variable to Eleventy:

```js
"production": "ELEVENTY_ENV=prod npx @11ty/eleventy",
```

Note that I am specifying a production environment in the npm script. Capturing the variable is easy:

```js
const basePath = (process.env.ELEVENTY_ENV === 'prod') ? '/my-custom-project/' : '/'
```

In short, if I'm building for the production environment, then I set a variable _basePath_ to the location of the project on my Github Pages account ('/my-custom/project/'). If I'm building locally then it will use '/' as the base path.

At the bottom of the module.exports in the .eleventy.js file, just include the following:

```js
  return {
    pathPrefix: basePath,
    dir: {
      output: "build",
      input: "src",
      data: "_data",
      includes: "partials_layouts",
    }
  };
```

and you're good to go. The _pathPrefix_ variable is prepended when you use the _url_ filter (this may be Nunjucks-specific but that's what I'm using). To take advantage of the feature, set up your urls as follows:

```html
<link rel="stylesheet" href="{{ '/css/main.min.css' | url }}">
```

The result in the production build is:

```html
<link rel="stylesheet" href="/my-custom-project/css/main.min.css">
```

and in the development build it will be:

```html
<link rel="stylesheet" href="/css/main.min.css">
```

I stumbled on this when I was reviewing the source code for the [eleventy-base-blog](https://github.com/11ty/eleventy-base-blog/blob/master/_includes/layouts/base.njk) and was overjoyed to see that I could eliminate the somewhat kludgy approach I'd taken (ok, it was actually pretty elegant but unnecessary).

The moral of this tale is that it pays huge dividends to do research when you have a problem, and continue to research the problem if you are not satisified with your answer because somebody smarter has likely already solved the problem.