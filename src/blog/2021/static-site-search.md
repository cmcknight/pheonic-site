---
title: Static Site Search
permalink: /blog/2021/static-site-search/
layout: blog-article-layout.njk
date: 2021-01-29
breadcrumbs:
    - label: Home
      url: /
    - label: Blog
      url: /blog/
    - label: Static Site Search
tags:
  - posts
---

So I am down to the last few odds and ends on the [Farmer Frog](https://farmerfrog.org) site migration from [Wordpress](https://wordpress.com) to a static site built with [Eleventy](https://11ty.dev) and the last big feature is the ability to do a full-text site search.

This is actually a bit trickier than it might appear at first glance. A static site differs from one built atop an application server because there is no application server. (Yes, I hear all of you saying, 'Well, duh!').

So what does that entail? Well, first off the site pages will need to be indexed when the site is built and that index will have to be deployed with the site. Size may well become an issue depending on the number of pages and the size of those pages. Why is that an issue? Because that index will be loaded by the browser.

I initially looked at [lunr.js](https://lunrjs.com) and [elasticlunr.js](elasticlunrjr.com) because they provide a wealth of functionality. However, the index build by lunr.js was a little over 2M in size which is pretty hefty. I realize that it's about the size of 1-2 high resolution images and that the index will be cached by the browser, but Farmer Frog is a 503(c) non-profit corporation that doesn't have tons of cash to spend on bandwidth. Fortunately, the Eleventy Discord forum provided a pointer to another search library, [minisearch](https://github.com/lucaong/minisearch) that performs most of the same functions but indexing the same content created an index that was 130K which will save Farmer Frog some money.

At this point, my options were to index the Markdown source files or the generated HTML files. While either is relatively easy to do, I opted for the HTML files and used the [cheerio](https://cheeriojs.org) HTML parser to build the index. The following code seems to do the trick:

<p><br></p>

```
// build a list of the Markdown files for the index
const glob = require ('glob');
const fs = require('fs');
const cheerio = require('cheerio');
const MiniSearch = require('minisearch');

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

  console.log(indexObj.text);
  indexObj.text = indexObj.text.trim();

  // add the object to the array of JSON docs
  jsonDocs.push(indexObj);
}

// save the index to disk
fs.writeFile(OUTPUT_DIR + '/searchIndex.json', JSON.stringify(jsonDocs), function(err) {
  if (err) throw err;
  console.log('Index saved.');
});

// Test code below commented out

// let miniSearch = new MiniSearch({
//   fields: ['title', 'text'],
//   storeFields: ['ref', 'title', 'text']
// });

// miniSearch.addAll(jsonDocs);

// let results = miniSearch.search('bear', {prefix: true});

// console.log(results.length);
// results.forEach(item => {
//   console.log(jsonDocs[item.id].ref);
//   console.log(jsonDocs[item.id].title);
// });
```
<p><br></p>
Now it was time to create the Javascript for the site to use minisearch. I'm still relatively new to Javascript, but the code below seems to work as I expect. I chose to rewrite the content body of the home page that exists between the navigation menu and the footer with the results of the search, and I made that div scrollable. Other than a few media queries to change font size, the code worked fine and it's pretty quick!
<p><br></p>

```
const searchButton = document.getElementById('search-btn');
const searchText = document.getElementById('search-txt');
searchButton.addEventListener('click', SiteSearch);

function SiteSearch(e) {
  // override default behavior
  e.preventDefault();

  // retrieve the search parameters from the search textbox
  const searchTerms = searchText.value.replace(/\s+/g, '+');

  // send the query to the home page
  window.location.href = `/?s=${searchTerms}`;

}

window.addEventListener('load', (event) => {
  const params = new URLSearchParams(window.location.search);
  if (params.has('s')) {
    // collect search parameters
    const searchParams = params.get('s');

    // pass parameters to site search
    performSiteSearch(searchParams);
  }
});

function performSiteSearch(params) {
  fetch('/_data/searchindex.json')
      .then(res => res.json())
      .then(data => {
        const jsonDocs = data;
        const miniSearch = new MiniSearch({
          fields: ['title', 'text'],
          storeFields: ['ref', 'title', 'text']
        });

        miniSearch.addAll(jsonDocs);

        let results = miniSearch.search(params, {
          prefix: true
        });

        let str = '<div class="search-results-container"><div class="search-results">';
        if (results.length > 0) {
        // build the list of articles
        str += `<h1>Search Results for: ${params}</h1><ul>`;

        results.forEach(r => {
          str += `<li><h2><a href="${r.ref}">${r.title}</a></h2>${r.text.substring(0, 200)} <a href="${r.ref}">[...]</a></li>
            `;
        });
        str += '</ul></div></div>';
        } else {
          str += `<h1>No Results for: ${params}</h1>`;
        }

        str += '</div></div>'

        const contentBody = document.getElementById('content-body');
        contentBody.innerHTML = '';
        contentBody.innerHTML = str;
      })
      .catch(err => console.log(err));
}
```
When I get some open time, I will try to create a step by step tutorial that walks through the process, but hopefully the code proves to be helpful.

