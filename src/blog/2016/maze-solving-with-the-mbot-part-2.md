---
title: Maze Solving with the mBot - Part 2
layout: blog-article-layout.njk
permalink: /blog/2016/{{ title | slugify }}/
date: 2016-01-26
breadcrumbs:
  - label: Home
    url: /
  - label: Blog
    url: /blog/
  - label: Maze Solving with the mBot - Part 2
tags:
  - posts
---

<!-- Excerpt Start -->

OK, so I've learned lots about the mBot and mBlock programming since my last post.

### The Good

It is possible, with patience, to write highly readable programs in mBlock (Scratch 2.0).
The Makeblock team keeps improving mBlock.

<!-- Excerpt End -->

### The Not So Good

The over-the-air serial lag for WiFi precludes anything realtime. This includes controlling the motors and reading values from sensors.
Cheap ultrasonic sensors are just not great. Jittery and just not reliable from my experience for highly precise measurements. There are more accurate ultrasonic sensors, but they are a bit pricey. You get what you pay for is the rule here.
Programming in Scratch 2.0 can be pretty convoluted.
The mBlock environment does not support Scratch lists.
mBlock code generation is limited to double-precision floating point variables. Period. No strings.
OK, enough of that. I knew it would be challenging, but perseverance is its own reward. After going down several rabbit holes (and taking a two week break from the problem to clear my head), I settled on making a wall following maze algorithm. It's not perfect by any means, but it can be implemented in mBlock.

<div class="image-container">

[![mBot Solving a Maze](http://img.youtube.com/vi/yx6JtQVpcUw/0.jpg)](http://www.youtube.com/watch?v=yx6JtQVpcUw 'mBot Solving a Maze')

<figcaption>The Mighty mBot in Action!</figcaption>
</div>

I should mention that the maze itself uses 3D printed posts and pegs (see [here](https://web.archive.org/web/20190414105742/http://www.thingiverse.com/thing:1169585) a bunch of 4mm foam core board, and some black masking tape. I'll write more about the choices in another post, but enjoy the mighty mBot boldly going where no mBot has gone before.

<div class="center-text">

[Originally published on _Robotic Ramblings_]

</div>
