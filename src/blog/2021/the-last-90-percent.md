---
title: The Last 90 Percent
permalink: /blog/2021/{{title | slugify }}/
layout: blog-article-layout.njk
date: 2021-03-09
breadcrumbs:
  - label: Home
    url: /
  - label: Blog
    url: /blog/
  - label: The Last 90 Percent
tags:
  - posts
---

<!-- Excerpt Start -->

Tom Cargill of Bell Labs is credited with the creation of the 90/90 rule for software development. The rule is:

<div class="blockquote">
  <div class="blockquote-content">
The first 90 percent of the code accounts for the first 90 percent of the development time. The remaining 10 percent of the code accounts for the other 90 percent of the development time.
  </div>
</div>
<!-- Excerpt End -->

I've been writing software for a very long time and I think Tom may have understimated. That being said I've spoken with a lot of developers about "_the last 90 percent_" with regard to what they do during the last 90 percent. The number one thing that seems to be left for the bitter end is documentation. While I do spend time editing the documentation towards the end, I'm always writing it as I go.

Another area is building an automated test suite. Small teams may not have access to a dedicated test team, so anything past unit tests seems to be put off until the end.

My personal area of sloth is finalizing build automation. I build just enough as I'm developing things to minimize the time I have to spend actually building stuff manually, but by the end of a project, especially the current web develpment project that I'm working on, I find myself focused on the small details (minification, autoprefixing, output cleanup, image optimization, automated deployment). I just finished a short course about Gulp.js on Udemy that gave me a huge boost in getting that done.

The continual learning aspect of software development is one of the more interesting and time-consuming things that I enjoy and curse in equal measure. However, I appreciate that most experienced developers are always looking for ways to make their lives easier and I'm thankful for the crew that created Gulp.js. It really has been a life-saver on this project.
