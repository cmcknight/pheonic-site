---
title: PyDevMgr - The Lazy Man's Tool Manager
permalink: /blog/2021/{{ title | slug }}/
layout: blog-article-layout.njk
date: 2021-02-13
breadcrumbs:
    - label: Home
      url: /
    - label: Blog
      url: /blog/
    - label: PyDevMgr - The Lazy Man's Tool Manager
tags:
    - posts
---

<!-- Excerpt Start -->
This was one of those scratch an itch projects because I have a lot of development projects that I do both professionally and as a hobby. Rather than try to remember where everything is and which tools I used to build them, I wrote PyDevMgr to keep track of that for me. I'm a huge fan of Albert Einstein's notion that I shouldn't have to remember all of the details, just where the details are stored (translation: I'm lazy).
<!-- Excerpt End -->

So off I went and built PyDevMgr in Python 3.9 and wxPython so that I could use it on whatever platorm I happen to be on (and yes, I work across multiple operating systems so that's a necessity for me). After some time on the whiteboard, I settled on a two screen design that leans heavily towards simplicity.

## Main Screen

The main screen (Figure 1) provides a wishful thinking UI that still needs some work for a few odds and ends <a href="fn1" id="fnote1"><sup>[1]</sup></a> but that will have to wait for another day.

<div class="center-image">
  <img src="/img/PyDevMgr/main-screen.png" alt="PyDevMgr Main Screen">
  <figcaption>Figure 1: PyDevMgr Main Screen</figcaption>
</div>

<br>

The main screen displays the projects and allow a project to be selected and launched from the launch button or double-clicked to launch. The buttons at the bottom of the project window allows the user to add a new project (+), edit an existing project, or remove a project (-).

The task editor screen (Figure 2) allows the user to change the details associated with the task.

<div class="center-image">
  <img src="/img/PyDevMgr/task-editor.png" alt="PyDevMgr Task Editor Screen">
  <figcaption>Figure 2: PyDevMgr Task Editor Screen</figcaption>
</div>

In addition to the usual data (task name, description, command) I opted to include the ability to track the number of times the task is executed and to sort the list on the main page by that number in descending order. My thought was that more active projects should appear at the top of the list and projects fall to the bottom I can determine whether or not I need to keep them. I'm also thinking that I need to track the last date the task was executed so I've added that to my list of "features".

Although I was packaging things as an app, the upgrade to Big Sur seems to have broken all of the Python packagers so I'm having to wait until they fix things to bundle them up. In the meantime, I wrote a shell script to make launching the app easier.

<hr class="footnote-bar">

<sup>[1] I need to add the keyboard-friendly events. I'll get there...