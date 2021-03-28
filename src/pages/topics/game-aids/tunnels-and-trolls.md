---
title: Tunnels & Trolls
layout: projects-layout.njk
permalink: "/topics/game-aids/{{ title | slug }}/{% if pagination.pageNumber > 0 %}{{ pagination.pageNumber | plus: 1 }}{% endif %}/index.html"
pagination:
  data: collections.TunnelsAndTrolls
  size: 10
  alias: projects
breadcrumbs:
  - label: Home
    url: /
  - label: Topics
    url: /topics/
  - label: Tunnels & Trolls
---
