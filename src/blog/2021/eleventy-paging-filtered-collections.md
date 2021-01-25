---
title: "Eleventy: Paging Filtered Collections"
permalink: /blog/2021/eleventy-paging-filtered-collections/
layout: blog-article-layout.njk
date: 2021-01-22
breadcrumbs:
    - label: Home
      url: /
    - label: Blog
      url: /blog/
    - label: "Eleventy: Paging Filtered Collections"
tags:
  - posts
  - Eleventy
---

I have mentioned in the past that I am using Eleventy for this blog and to build a site for a non-profit organization, [Farmer Frog](https://farmerfrog.org), that distributes food donations to 1.5+ million people across the Pacific Northwest. The blog is sort of my sandbox for testing things before I incorporate them into the Farmer Frog site. Farmer Frog had a blog at one point that was dropped because it was not getting many views. However there are some interesting articles on the blog so I have resuscitated it as part of the move from Wordpress to Eleventy.

Everything was sailing right along until the time came to create custom collections of articles associated with an author. On a single-author blog, this wouldn't be an issue, but there are several authors on the Farmer Frog blog so I needed a way to create a collection of posts for each author. My initial take was to try to create a custom collection:

<br>

<div>
  <pre>
    eleventyConfig.addCollection('authorPosts', function(collectionApi) {
        let myColl = [];
        let posts = collectionApi.getFilteredByTag('posts');
        
        // build array of author post objects
        posts.forEach(post => {
            if (myColl.length == 0) {
                // add new author object
                const authObj = { author: post.data.author, posts: [post]};
                myColl.push(authObj);
            } else {
                let obj = myColl.find(x => x.author === post.data.author);
                if (obj === undefined) {
                    // add new author object
                    const authObj = { author: post.data.author, posts: [post]};
                    myColl.push(authObj);
                    } else {
                    // push item onto object's posts array
                    obj.posts.push(post);
                }
            }
        });

        // console.log(myColl);
        return myColl;
    });
  </pre>
</div>

<br> 

Which creates a dictionary<sup id="fnote1"><a href="#fn1">1</a></sup> of author objects that contains an array of the posts by the author (see below):

<br>

<div>
  <pre>
    {author: "author name":, posts: [{post1}, {post2}, ...]}
  </pre>
</div>

<br>

However, in practice this broke pagination and I didn't want to have to reinvent the wheel for that so then I looked at just filtering the posts on the spot by using a filter:

<br>

<div>
  <pre>
    eleventyConfig.addFilter("byAuthor", function(posts, author) {
        return posts.filter(post => post.data.author === author);
    });
  </pre>
</div>

<br>

This created a different type of pagination breakage where I'd only get the first article on each page and if I set the size to 1 the whole thing would throw an error.

Annoying to say the least.

So after spending a few hours Googling, I went back to the docs thinking that this could **NOT** be a new problem (I was right) and found the **before:** parameter for the pagination object. This parameter allows you to use a callback method to do any sort of data munging that you need to do on a collection _before_ the template begins its processing to generate the HTML page.

Huzzah! I thought and dropped in the code from my filter (good programmers never rewrite anything they don't have to) and...

Eleventy threw an error...

Why? Because Nunjucks apparently won't let you do that. Grrrrr.....

So I wound up rewriting the frontmatter from this:

<br>

<div>
  <pre>
    {% raw %}
    ---
    title: "Blog"
    permalink: "/authors/john-doe/{% if pagination.pageNumber > 0 %}{% pagination.pageNumber | plus: 1 %}{% endif %}/index.html"
    layout: "author-posts.njk"
    author: "John Doe"
    breadcrumbs: 
      - label: "Home"
        url: "/"
      - label: "Blog"
        url: "/blog/"
      - label: "John Doe"
    pagination: {
      data: "collections.posts",
      size: 4,
      reverse: true,
      alias: "posts",
      before: function(data) { return data.filter(x => x.data.author === "John Doe" )}
    }
    ---
    {% endraw %}
  </pre>
</div>
<br>

to this:

<br>

  <pre>
    {% raw %}
    ---js
    {
      title: "Blog",
      permalink: "/authors/john-doe/{% if pagination.pageNumber > 0 %}{% pagination.pageNumber | plus: 1 %}{% endif %}/index.html"
      layout: "author-posts.njk",
      author: "John Doe",
      breadcrumbs: [ 
        {label: "Home", url: "/"}, 
        {label: "Blog", url: "/blog/"}, 
        {label: "John Doe"}],
      pagination: {
        data: "collections.posts",
        size: 4,
        reverse: true,
        alias: "posts",
        before: function(data) { 
          return data.filter(x => x.data.author === "John Doe" )
          };
      }
    }
    ---
    {% endraw %}
</pre>

<br>

I also modified the template from this:

<br>

  <pre class="center-text">
    {% raw %}{% for post in posts | byAuthor( author) %}{% endraw %}
  </pre>

<br>

to this:

<br>

  <pre class="center-text">
    {% raw %}{% for post in posts %}{% endraw %}
  </pre>

<br>

Finally! It works as expected. To be honest, I was half-expecting that it might require a plugin or that I'd have to write something specific because 11ty is still relatively young and is under constant development so finding the **before:** property made my task much simpler.

<br>


<hr style="width: 20rem;">
<sup id="fn1">1</sup>A dictionary is the same thing as a Javascript object.<a href="#fnote1">&larrhk;</a>