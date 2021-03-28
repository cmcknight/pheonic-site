---
title: Robotics Projects
layout: projects-layout.njk
permalink: "/topics/{{ title | slug }}/{% if pagination.pageNumber > 0 %}{{ pagination.pageNumber | plus: 1 }}{% endif %}/index.html"
pagination:
  data: collections.Robotics
  size: 10
  alias: projects
breadcrumbs:
  - label: Home
    url: /
  - label: Topics
    url: /topics/
  - label: Robotics Projects
---
