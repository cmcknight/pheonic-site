---
title: Pheonic Blog
layout: blog-layout.njk
permalink: "/blog/{% if pagination.pageNumber > 0 %}{{ pagination.pageNumber | plus: 1 }}{% endif %}/index.html"
pagination:
    data: collections.posts
    reverse: true
    size: 2
    alias: posts
---