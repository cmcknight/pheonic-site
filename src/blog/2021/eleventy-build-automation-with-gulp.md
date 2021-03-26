---
title: Eleventy Build Automation with Gulp
permalink: /blog/2021/{{ title | slug }}/
layout: blog-article-layout.njk
date: 2021-03-26
breadcrumbs:
    - label: Home
      url: /
    - label: Blog
      url: /blog/
    - label: Eleventy Build Automation with Gulp
tags:
  - posts
---

Building a site with Eleventy is pretty slick and relatively simple, but when you are ready to deploy your content you really need to do some cleanup, minfiication, etc., to ensure that you are using as little bandwidth and storage as possible. You _could_ do that manually every time or build scripts to do that, but there is a better answer if you are somewhat familiar with Javascript:  [Gulp](https://gulpjs.org).

Gulp is a task runner that essentially is like a makefile utility. The tasks are defined in a file named _gulpfile.js_. Rather than bore the reader with a long, theoretical monologue, let me provide an example of a gulpfile that I just completed for the documentation site I built for [Farmer Frog](https://farmerfrog.org). This walkthrough assumes you are familiar with Javascript.

<br>

---

## Installing Gulp

Installing Gulp is simple. Just use the following command to install the command line utility.

```
npm i --global gulp-cli
```

To add gulp to your project, use:

```
npm i --save-dev gulp
```

Okay, now let's walk through the gulpfile...

<br>

---

## Module Declarations

The first part of the file are the includes. Gulp allows you to deconstruct its exported methods so that you are not burdened with having to type _gulp.method_.

As is typical, the first portion of gulpfile.js are the module declarations:

```
const {
  src,
  dest,
  series,
  parallel,
  watch
} = require('gulp');

const cp = require("child_process");
const cssnano = require('gulp-cssnano');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const imagemin = require('gulp-imagemin');
const htmlmin = require('gulp-htmlmin');
const sitemap = require('gulp-sitemap');
const save = require('gulp-save');
const removeEmptyLines = require('gulp-remove-empty-lines');
const autoprefixer = require('gulp-autoprefixer');
const babel = require('gulp-babel');
const browserSync = require('browser-sync').create();
const glob = require ('glob');
const fs = require('fs');
const cheerio = require('cheerio');
const del = require('del');
```

<br>

---

## Render Task

Following the module declarations, we come to the first gulp private task, _render_. The _render_ task launches Eleventy in a child process and renders the site to the build folder<a href="#fn1" name="fnote1"><sup>[1]</sup></a> (the folder name is specified in the _.eleventy.js_ file).

```
// Use Eleventy to generate the site in the 'build' folder
const render = () => {
  return cp.spawn("npx", ["eleventy", "--quiet"], {
    stdio: "inherit"
  });
};
```

<br>

---

## HTML Minification Task

The next task minifies the HTML created by the _render()_ task. This task provides an example of the use of Gulp's _.pipe()_ function to insert processing steps. As this function is typical of a Gulp task, let's examine it more closely.

```
// process HTML files (minify)
const processHTML = () => {
  return src('build/**/*.html')
  .pipe(htmlmin({ collapseWhitespace: true }))
  .pipe(dest('./dist'))
}
```

In the _processHTML()_ task, we see that the locaiton of the input files are specified in the _src_ arguments and a _globstar_ argument ('**') is used to take in all files and directories under the source folder. Essentially the src method will loop over each file it finds and read the content into a stream that it passes on down the chain.

As each file is read, it is passed into the _.pipe()_ function that calls the gulp plug-in for _htmlmin_ and passes the _collapseWhitespace_ argument to _htmlmin_.

The output of the _.pipe()_ function is then passed to the _dest_ function that specifies the top-level location to write the file. It is important to note that the full relative path of the file will be written. For example, if an HTML file is at ./build/page/index.html then the output file will be written to ./dist/page/index.html.

<br>

---

## Create Site Map Task

The next function creates a sitemap for web crawlers.

```
// create SEO sitemap
const siteMap = () => {
  return src('build/**/*.html', { read: false })
  .pipe(save('before-sitemap'))
  .pipe(sitemap({ siteUrl: 'http://farmerfrog.org'}))
  .pipe(removeEmptyLines())
  .pipe(dest('./dist'))
  .pipe(save.restore('before-sitemap'))
}
```

the _siteMap()_ task starts by setting up the _src_ function, but in this case we do not want to read the contents and only want the file names so we set the argument _read_ to false.

As each file is read, the state of the file is saved using the _save()_ function so that it can be restored after all processing is complete. This may be an unnecessary step, to be honest, but it doesn't appear to impact performance so better safe than sorry. It and the _restore()_ function may be removed in the future, but for now it's there.

After saving the state the stream essentially passed the filename to the _gulp-sitemap_ plug-in and specifies the site URL to be prepended to the file name.

This output is then sent to the _removeEmptyLines_ plug-in to remove any empty lines, a sort of minification process. A further optimization might be to remove line feeds but I am not sure at this time that it would bring much value due to the relatively small size of the site.

From there, the output is routed to the location specified in the _dest_ function.

<br>

---

## CSS Autoprefixer / Minification Task

The _processCSS()_ task uses the _gulp-cssnano_ and _gulp-autoprefixer_ plugins to apply autoprefixer to the CSS before minifying it.

```
// process CSS files (autoprefix for cross-browser compatibility, minify)
const processCSS = () => {
  return src('./src/**/*.css')
  .pipe(autoprefixer())
  .pipe(cssnano())
  .pipe(dest('./dist'))
}
```
<br>

---

## Javascript Babel / Minification Task

Like the _processCSS()_ task, the _processJavascript()_ task uses the same pattern _src -> pipe(s) -> dest_ to run the Javascript files through the _gulp-babel_ and _gulp-uglify_ plug-ins to ensure compatibility with earlier versions of Javascript and to minify the output.

```
// process Javascript files (babel for cross-browser compatiblity, minify)
const processJavascript = () => {
  return (src(['./src/js/**/*.js', '!./src/utilities/indexer.js']))
  .pipe(babel({ presets: ["@babel/env"]}))
  .pipe(uglify())
  .pipe(dest('./dist/js'))
}
```

<br>

---

## Image Minification Task

The _optimizeIMages()_ task uses the _gulp-imagemin_ plug-in to reduce the size of the images on the site. The _imagemin_ library has several plug-ins of its own to address different image formats.

```
// optimize images (reduce image sizes)
const optimizeImages = () => {
  return (src('./src/img/**/*'))
  .pipe(imagemin([
    imagemin.gifsicle({ interlaced: true }),
    imagemin.mozjpeg({ quality: 50, progressive: true }),
    imagemin.optipng({ optimizationLevel: 5 }),
    imagemin.svgo( { 
      plugins: [ 
        { removeViewBox: true }, 
        { cleanupIDs: false}
      ]
    })
  ]))
  .pipe(dest('./dist/img'))
}
```

<br>

---

## Building the Site Search Index

The Farmer Frog site uses the _minisearch_ module to provide a full-text site search capability. The _minisearch_ module uses a remarkably small search index that it builds when first invoked. However, that process relies on a pre-built array of JSON objects. There is not a gulp plug-in for _minisearch_ at this time, but it is relatively simple to create a custom function and call it from the gulp task.

The task itself is straightforward:

```
// build the site search index
const buildSiteIndex = async () => {
  await buildIndex();
}
```

Note the use of the asynch/await directives. These are required because all Gulp tasks are asynchronous. There is no need to minify the output from _buildIndex()_ because the file is already "minifed" by the JSON _stringify_ method. The _buildIndex()_ function code is included in the _gulpfile.js_ and appears as follows:

```
// Build the site index from the HTML files
const buildIndex = () => {
  const jsonDocs = [];
  const EXCLUDES = ['**/node_modules/**', 
                    '**/categories/**', 
                    '**/tags/**',
                    '**/docs/**',
                    '**/articles/**',
                    '**/authors/**'];
  const OUTPUT_DIR = 'src/_data';
  const INCLUDE_PATTERN = '**/*.html';

  const myList = glob.sync(INCLUDE_PATTERN, {ignore: EXCLUDES});

  // convert HTML documents into JSON documents for array
  for (let i = 0; i < myList.length; i++) {
    let indexObj = {};

    // load the file into a string
    let htmldoc = fs.readFileSync(myList[i], 'utf8');
    let $ = cheerio.load(htmldoc);

    // build the JSON document
    indexObj.id = i;
    indexObj.ref = myList[i].replace('dist', '');

    let title = $('title');
    indexObj.title = $('title').text();
    indexObj.text = ' ';

    // Concatenate the text from the paragraph tags
    $('p').each(function(i, e) {
        let str = $(this).text().trim().replace(/\s+/g, ' ');

        if (str.length > 0) {
          indexObj.text += str + ' ';
        }
    });

    indexObj.text = indexObj.text.trim();

    // add the object to the array of JSON docs
    jsonDocs.push(indexObj);
  }

  // save the index to disk
  fs.writeFile(OUTPUT_DIR + '/searchIndex.idx', JSON.stringify(jsonDocs), function(err) {
    if (err) throw err;
    console.log('Index saved.');
  });
}
```

<br>

---

## Copy Search Index

After the index file has been built, the _copyIndexFile()_ task copies it from the _build/data_ directory to the _dist/data_ directory. This is one of the simplest tasks you can perform with Gulp.

```
// copy the search index
const copyIndexFile = () => {
  return src(['./src/_data/**/*'])
  .pipe(dest('./dist/_data'))
}
```

<br>

---

## Copy Robot.txt files

Like the _copyIndexFile()_ task, this task simply copies files.

```
// Move the robots.txt files
const copyRobotsText = () => {
  return src(['./src/robots*.txt'])
  .pipe(dest('./dist'))
}
```

<br>

---

## Clean Tasks

It is generally a good practice to build from scratch. Why? Builds need to be reproducibly consistent. When one performs a "partial-build" there is the chance that something won't build correctly but the relics from a previous build will still be hanging around thereby complicating debugging. Your mileage may vary on this, but from my experience building from scratch ensures that I see the actual errors rather than ghost errors that occur from pre-existing artifacts.

The tasks are straightforward and easy to implement:

```
// clean the dist folder
const cleanDist = () => {
  return(del('./dist/**/*'))
}

// clean the build folder
const cleanBuild = () => {
  return(del('./build/**/*'))
}
```

<br>

---

## Monitor Task

Gulp also provides the capability to spawn a web server to view the site and uses the _browserSync_ module to update the page when a change occurs. However, this is generally less useful because the same functionality is provide via Eleventy. For the Farmer Frog project, Gulp is used to create the production distribution, not the ongoing development so the watch task is primarily used to preview the production build although changes made to the files in the _build_ directory should also trickle up.

```
// watch for changes to files
const monitor = () => {
  browserSync.init({
    server: 'dist',
    browser: 'Google Chrome'
  })

  watch([ './build/**/*' ])
}
```

<br>

---

## Exported Tasks

All of the tasks discussed so far are private. Like all Javascript modules, anything that must be externally visible must be exported. Gulp supports the notion of a default task (named _default_) as well as individually named tasks. 

An exported task may be assigned to a single function, as in the case of the _monitor_, _clean\_build_, _clean\_dist_, and _clean\_all_ tasks. Gulp also provides two functions, _serial()_ and _parallel()_, that provide the capability to specify that tasks should be performed serially or in parallel despite all tasks in Gulp being asynchronous.

```
// define Gulp External Tasks

// build the dist folder contents
exports.default = series( cleanBuild,
                          cleanDist,
                          render, 
                          buildSiteIndex,
                          copyIndexFile,
                          processHTML,  
                          siteMap, 
                          processCSS, 
                          processJavascript, 
                          optimizeImages,
                          copyRobotsText);

// Monitor the site in the dist folder
exports.monitor = monitor

// clear the contents of the build folder
exports.clean_build = cleanBuild;

// clear the contents of the dist folder
exports.clean_dist = cleanDist;

// clear the contents of the build and dist folders
exports.clean_all = parallel( cleanBuild, cleanDist)
```

As you can see, the default task is reponsible for creating the production build. To do so, it first cleans out the _build_ and _dist_ directories, then calls the _render_ internal task to generate the site to the _build_ directory before executing the remaind of the tasks. It is also important to note that default task conducts its tasks in series while the _clean\_all_ task executes its tasks in parallel.

<br>

---

## Wrapping Up

I do not claim to be a master of Gulp nor Javascript and there are likely more improvements that can and will be made going forward. However, this is, in my opinion, a reasonably good start on using Gulp for build automation.

<br>
<hr style="width: 20rem;">
<sup name="fn1">[1]</sup> The name <em>build</em> is used so that the developers are able to test their changes. Gulp will be used to generate the production deployment and creates the <em>dist</em> folder for that output. <a href="#fnote1">&larrhk;</a>