---
title: Playing with Materialize CSS
permalink: /blog/2021/{{title | slugify }}/
layout: blog-article-layout.njk
date: 2021-06-01
breadcrumbs:
  - label: Home
    url: /
  - label: Blog
    url: /blog/
  - label: Playing with Materialize CSS
tags:
  - posts
---

<!-- Excerpt Start -->

I've started experimenting with CSS frameworks to expand my knowledge base. While HTML5 / CSS3 have somewhat subsumed a lot of what those frameworks were originally developed to solve by being based on JQuery, more and more of them are moving away from JQuery as their underlying basis and towards some custom Javascript to support components and CSS3 everywhere else.

<!-- Excerpt End -->

There are still use cases for using JQuery, but as JQuery seems to have originally been built to solve cross-browser compatibility issues, it appears to be falling out of favor with more modern browsers being mostly compliant with "web standards". Several pundits have also noted that JQuery continues to get bigger and slower which is also likely driving the emergence of JQuery-less CSS frameworks.

Other frameworks I plan to look at are:

- Bootstrap 5
- Bulma
- Foundation
- SkeletonCSS
- TailwindCSS

At some point in the future when I get some "copious free time", I plan to redesign this site using one of those frameworks because nothing will teach you better than a hands-on project that is more than just an academic toy.

So why investigate CSS Frameworks instead of rolling your own you might ask. The rationale is the same for any other endeavor that has many moving parts. A great deal of the rationale is to move towards standardization of the components (the atomic details) to focus on the system as a whole. Most desktop applications use the standard components for controls and the styling is pretty well baked in. Although one can write custom controls or perform some level of customization on standard controls, the appearance will be fairly standard across the same platform (the Qt library provides the same appearance across all platforms but that may not be desirable). Therefore the ability to freely style components is a strength of web development.

However, one can while away endless hours essentially bit-twiddling with CSS. Unlike desktop applications, web pages have to provide a reasonable presentation on a far larger array of screen sizes and browser capabilities than do native applications. That's where CSS frameworks can alleviate some of the effort by providing "pre-built" components.

Bootstrap is one of the oldest "front-end" frameworks and provides excellent responsiveness across most, if not all, screen sizes. Unfortunately, a lot of web developers just grab a Bootstrap template and do comparatively minor modifications. This has resulted in a large number of web sites that are "template-y" (which some translate to "boring"). The sites work well, but in general there is nothing from a design perspective to differentiate them from the thousands of other sites that used the same template.

So is that good or bad? Well, that really depends on the individual. The good is that the cognitive burden of having to learn how to use the site is lowered and for some categories of sites that may be okay. However, the visual blandness is often ill-suited to return visitors if the site is not somewhat utilitarian in nature (e.g., dashboards). While I am hardly an artist, I believe that it is important to create a visually interesting site, even for dashboards, to ensure that the visitor is engaged while on the site. The bad, of course, may be that the impression given is that the site owner/developers didn't care enough to put forth any effort, and sadly that is the case for far too many sites.

Of course, your personal mileage on this may vary, but that's my tuppence on it.
