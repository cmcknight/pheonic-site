---
title: Applescript is not Hypercard
permalink: /blog/2021/{{ title | slug }}/
layout: blog-article-layout.njk
date: 2021-01-07
breadcrumbs:
    - label: Home
      url: /
    - label: Blog
      url: /blog/
    - label: Applescript is not Hypercard
tags:
  - posts
---

Developers are lazy and good developers are _**really**_ lazy. I do not say that to be disparaging. Good developers are always looking for a way to automate the grunt work (defined as anything that is repetitve). The tools used range from custom shell scripts to full-on automation suites in the endless quest to provide more time to focus on the important things in life. Like Apex or Fortnight.

That being the case, I've started working with Applescript to automate some of the daily tasks that I've identified as repetitive (read boring). I have worked off and on with Hypercard (now [LiveCode](https://livecode.com)), and great product that originated on the Apple MacIntosh. I remember HyperCard allowing a lot of people to create applications that might have been far more daunting in Objective C. Unfortunately, Apple chose to let go of HyperCard.

So today I started learning Applescript and AppleScriptObjC. These two are highly verbose, English-like languages that remind me of the verbosity of COBOL (yes, I've worked COBOL. Don't ask.) Searching through the forums, there seems to be some question as to how long Apple will continue to support AppleScript/AppleScriptObjC. In fact, the latest Script Editor application also supports Javascript.

So far, the book I'm using, _AppleScript 1-2-3_, but Sal Soghoian and Bill Cheeseman, seems to spend a lot of time on automating the Finder (I'm on chapter 4 right now). The authors have done a good job with their explanations, but one of the things I did out of the box was to pick up a copy of [Script Debugger](https://latenightsw.com) because all of the folks I spoke to recommend it as a superior way to write/debug AppleScript.

Oh, and because there is nothing like learning a new IDE at the same time as a new language. &#129315;

I'm not at the point of considering myself to have mastered AppleScript, but I will share that while it is a powerful automation tool, it is not HyperCard. _AppleScript 1-2-3_ has several exercises that do not work with Big Sur which comes as no surprise give the book is nearly twelve years old, but for the most part it covers everything in detail.

So for the TL;DR crowd out there (and you know who you are), Applescript is for automation, HyperCard is for automation **and** writing applications.