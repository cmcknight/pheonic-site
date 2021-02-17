---
title: Desktop Projects
layout: projects-layout.njk
permalink: "/topics/desktop-projects/{% if pagination.pageNumber > 0 %}{{ pagination.pageNumber | plus: 1 }}{% endif %}/index.html"
pagination:
    data: collections.Desktop
    reverse: true
    size: 10
    alias: projects
breadcrumbs:
  - label: Home
    url: /
  - label: Topics
    url: /topics/
  - label: Desktop Projects
---
