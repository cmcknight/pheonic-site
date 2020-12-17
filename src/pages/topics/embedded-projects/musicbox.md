---
title: MusicBox for Arduino
permalink: /pages/topics/embedded-projects/musicbox/
layout: project-page-layout.njk
breadcrumbs:
  - label: Home
    url: /
  - label: Topics
    url: /pages/topics/
  - label: Embedded Projects
    url: /pages/topics/embedded-projects/
  - label: MusicBox
repo_link: https://github.com/senestone/MusicBox
tags:
  - Arduino
  - C
  - "C++"
  - Embedded
---

<!-- Excerpt Start -->
This library provides a non-blocking Arduino music player using the non-blocking millis() method for timing versus using the delay() method (which is a blocking call). This object also makes use of the [ActionTimer)(https://github.com/senestone/ActionTimer) object provided by Senestone.
<!-- Excerpt End -->

The MusicBox object loads data contained within a global two-dimensional array<sup>1</sup>. The inner array consists of a note and duration pair, where the note can be represented by a numeric value or by using one of the named constants from the pitches.h file. Durations are expressed in milliseconds.

----
<sup>1</sup> While purists may argue for using a melody object or some other OO concept, in my mind it works out to be additional overhead and requires additional memory. However, feel free to fork the repo and do it how you like.
