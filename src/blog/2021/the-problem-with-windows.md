---
title: The Problem with Windows
permalink: /blog/2021/{{title | slug }}/
layout: blog-article-layout.njk
date: 2021-03-28
breadcrumbs:
    - label: Home
      url: /
    - label: Blog
      url: /blog/
    - label: The Problem with Windows
tags:
  - posts
---

<!-- Excerpt Start -->
I had just checked everything in and asked for other people on the development team to make sure things built on their system.

They reported back that everything broke...
<!-- Excerpt End -->
After spending some time reviewing their issues I came upon the following:

* Windows has a collection of reserved characters that cannot be used in a filename
* Windows security policies prevent Visual Studio Code from running Gulp

Sigh...

So the first issue with the reserved characters in a filename was relatively simple to fix. I say relatively, because I _thought_ I could just use the Nunjucks _replace()_ filter and send in a regex. However, I couldn't find a way to get that to fly because there is an embedded double-quote (") that even escaping wouldn't fix. I'm pretty sure the Nunjucks filter sits atop the Javascript _replace()_ function, so I wrote a quick filter:

```
    // create filter to remove characters that are invalid for
    // the Windows filesystem
    eleventyConfig.addFilter('windowsFilenameFilter', (text) => {
        const regex = /[:\/\!\<\>\"\/\\\|\?\*]/g;
        return text.replace(regex, '');
      });
```

and voilà, I was back in business by changing:

```
{%- raw -%}
{{ title | slug }}
{%- endraw -%}
```

to:


```
{%- raw -%}
{{ title | windowsFilenameFilter | slug }}
{%- endraw -%}
```

Okay, one down, one to go. Having just learned [Gulp](gulpjs.org) I was surprised to hear that it was acting up on Windows so off I went to find a Windows machine I could test on to see what was happening. It turned out to be a combination of things:

* Windows security policy settings
* Missing a parameter on the child_process call to spawn

On the first one, I am no expert on Windows security policies being more of a Unix person. I did notice that while the error occurred when Gulp was executed through the terminal in Visual Studio code, it seemed to launch just fine when I opened an actual PowerShell terminal. Yay, I don't want to mess with Windows Security policies, especially on someone else's machine. Let them mess it up and deal with the security issues. 	&#129315;

Moving on, I spent a few minutes with the Oracle of All Knowledge, aka Google / Stack Overflow to see if anyone else had this issue and discovered that the solution was to add a parameter to the call to spawn.

```js
Original Code

// Use Eleventy to build the site in the 'build' folder
const render = () => {
  return cp.spawn("npx", 
                  ["@11ty/eleventy", "--quiet"], 
                  { stdio: "inherit" }
  )
}
```

```js
Modified Code

// Use Eleventy to build the site in the 'build' folder
const render = () => {
  return cp.spawn("npx", 
                  ["@11ty/eleventy", "--quiet"], 
                  { stdio: "inherit", shell: true }  <======== Note the addition of shell: true
  )
}
```

I remember from waaaaay back when I used to sling code for Windows that the child process calls that I took for granted in Unix were not quite as straightforward under Windows. Apparently that hasn't changed much. I launched Gulp from the terminal and was pleasantly surprised to see that with that one fix everything worked.

With that out of the way, I am one step closer to being done with this iteration on the Farmer Frog web site. Next I will be futzing around with integrating with the Google Calendar.