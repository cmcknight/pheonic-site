---
title: Are delay and delayMicroseconds Considered Harmful?
permalink: /blog/are-delay-and-delaymicroseconds-considered-harmful/
layout: blog-article-layout.njk
date: 2018-02-18
tags:
    - posts
---

One of the big things I've noticed in a lot of the Arduino tutorials is the use of delay() and delayMicroseconds(). Both of these methods are "blocking" calls that literally stop the operation of the microprocessor until they complete. Apparently a lot of folks aren't aware of the millis() and micros() timer functions which are non-blocking so I wrote a small utility object named ActionTimer that uses the millis() method and published it on Github [link](https://web.archive.org/web/20190414105803/https://github.com/senestone/ActionTimer). It seems to work well for me but of course, your mileage may vary. More interestingly is that I have seen the same thing pop up for the FTC teams using the FTC SDK in Java, so it is apparently not an uncommon situation.

<div class="center-text">

[Originally published on _Robotic Ramblings_]

</div>