---
title: Pheonic Blog
layout: blog-layout.njk
permalink: '/blog/{% if pagination.pageNumber > 0 %}{{ pagination.pageNumber + 1 }}{% endif %}/index.html'
pagination:
  data: collections.posts
  reverse: true
  size: 4
  alias: posts
---
