---
title: "Eleventy: Filtering Custom Collections"
permalink: /blog/2021/{{ title | slug }}/
layout: blog-article-layout.njk
date: 2021-01-24
breadcrumbs:
    - label: Home
      url: /
    - label: Blog
      url: /blog/
    - label: "Eleventy: Filtering Custom Collections"
tags:
  - posts
  - Eleventy
---

<!-- Excerpt Start -->
Today I needed to create more pages for the [Farmer Frog](https://farmerfrog.org) site that I am building in [Eleventy](https://11ty.dev). The site has a group of categories that have one or more posts associated with each category. Having recently discovered the joys of the **before:** property, I teed it up to solve this issue.
<!-- Excertp End -->

The categories for each article are stored in the frontmatter:

```
    ---
    ...
    category:
      - Category 1
      - Category 2
      - etc.
    ...
    ---
```

The first step in the process was to create a custom collection of posts that had categories (no point in having any posts that don't have categories). I used the following code to do that:

```
---js
    eleventyConfig.addCollection("categories", function(collectionApi) {
        let myColl = [];
        let posts = collectionApi.getAllSorted();

        posts.forEach(post => {
            if(post.data.category !== undefined) {
                myColl.push(post);
            }
        });
        return myColl;
    });
```

The next step was to set up the frontmatter for each category page:


```
    ---js
    {
      title: ["Blog : Category : My Category"],
      permalink: "/categories/my-category/{% if pagination.pageNumber > 0 %}{{ pagination.pageNumber | plus: 1 }}{% endif %}/index.html",
      layout: "category.njk",
      breadcrumbs: [ {label: "Home", url: "/"}, {label: "Blog", url: "/blog/"}, {label: "My Category"}],
      pagination: {
        data: "collections.categories",
        size: 4,
        reverse: true,
        alias: "posts",
        before: function(data) { return data.filter(post => post.data.category.includes('my category') === true )}
      },
    }
    ---
```

There may be a much more elegant way to do this, and if I find one I'll write it up!

In any case, the lessons learned previously made the solution to this problem relatively effortless.