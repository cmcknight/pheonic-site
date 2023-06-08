---
title: Tunnels & Trolls
layout: projects-layout.njk
permalink: '/projects/game-aids/{{ title | slugify }}/{% if pagination.pageNumber > 0 %}{{ pagination.pageNumber + 1 }}{% endif %}/index.html'
pagination:
  data: collections.TunnelsAndTrolls
  size: 10
  alias: projects
breadcrumbs:
  - label: Home
    url: /
  - label: Topics
    url: /projects/
  - label: Tunnels & Trolls
---
