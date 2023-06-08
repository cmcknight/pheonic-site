---
title: Embedded Projects
layout: projects-layout.njk
permalink: '/projects/{{ title | slugify }}/{% if pagination.pageNumber > 0 %}{{ pagination.pageNumber + 1 }}{% endif %}/index.html'
pagination:
  data: collections.Embedded
  size: 10
  alias: projects
breadcrumbs:
  - label: Home
    url: /
  - label: Topics
    url: /projects/
  - label: Embedded Projects
---
