---
title: The Joys of Documentation
permalink: /blog/2021/{{title | slugify }}/
layout: blog-article-layout.njk
date: 2021-02-16
breadcrumbs:
  - label: Home
    url: /
  - label: Blog
    url: /blog/
  - label: The Joys of Documentation
tags:
  - posts
---

<!-- Excerpt Start -->

You know you're getting towards the end of the project when it's time to start putting your dev notes into documentation. In my case, the documentation for the [Farmer Frog](https://farmerfrog.org) site has to cover a wide variety of topics for several different audiences. My initial thought was "hey, I'll just store this stuff in a docs folder and call it good". That lasted for about three days until I realized that most developers would like to have a way to search docs for information.

<!-- Excerpt End -->

Sigh...

So since I have been building all of these rad web development skills (_okay, stop laughing, I really am getting better at this_), I decided to build a dedicated doc site so that I could have all of the docs in one place and provide a site-wide search. Having not developer that type of site, I immediately went on a bug hunt to look at what other people have done because I'm all about stand on the shoulders of giants when you can (I'm also all about amateurs plagiarize, professionals steal but that's a story for another day).

All that being said, I settled on a big button landing page based on the anticipated audience, a smaller button index page for the various groups of articles, and a two-pane layout for the articles. I took inspiration from the Farmer Frog web site with regards to color theming although I chose to go to a much simpler thematic style and voilá, I was ready to start building the site. To be honest, it was much more straightforward than I anticipated and gave me an opportunity to have another deep dive into [Eleventy](https://11ty.dev). The ease of adding new filters and collections is still an amazing thing so props to the Eleventy devs for making what might otherwise be a major pain into a relatively minor pain.

After I've delivered the project and have sign off, I'll abstract the docs site as a template and throw it into Github for public consumption.
