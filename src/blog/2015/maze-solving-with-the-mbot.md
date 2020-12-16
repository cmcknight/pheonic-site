---
title: Maze Solving with the mBot
layout: blog-article-layout.njk
permalink: /blog/2015/maze-solving-with-the-mbot/
date: 2015-12-03
tags:
    - posts
---

One of the exercises that I want to do with the mBot is to write a maze solving application in the mBlock environment. While it certainly would be easier to do in the native Arduino environment, I'm always up for a challenge. The mBlock environment is based on the Scratch 2.0 offline editor and is open source software. One of the issues with the Scratch 2.0 offline editor is that it is written in Adobe's proprietary ActionScript. Yes, you read that correctly, ActionScript. For Adobe Air. You know, the supposedly cross-platform environment that isn't supported under Linux (FAIL!@!). In any case, enough ranting about the choice of development language the MIT team has made, I have to live with it (for now).

One of the constraints of Scratch is that it really doesn't have any data structures beyond a linked list that can only contain numbers or strings. It's likely okay for teaching basic programming, but the inability to have lists of lists eliminates any easy approach to custom data structures and imposes a lot of overhead for keeping lists synchronized to emulate data structures. Sigh. Did I mention that I'm always up for a challenge?

With all that in mind, I'm working on writing a maze solving program in mBlock that will run via the 2.4g WiFi connection. During the process of testing the components of the program, I've come across the following findings:

1. For turning in place, the axles of the robot constitute the center of the robot.
2. The motors are not encoded, so consistent accurate turning is difficult to achieve programmatically.
3. Giving the motors the same values to make a turn (i.e., 100 / -100) results in the motor with the positive value turning and the other motor sitting idle. (Update: this is due to serial lag over wifi when running from the mBlock environment. The problem does not exist if you upload the program to the mBot and run it there)

I've ordered a gyro sensor and a compass sensor to see if I can improve the accuracy of the turns and will report on that when I get them. I was initially looking at using the ultrasonic sensor to detect walls and having the robot spin in each new room to map the walls in the room. However, that approach is hampered until I suss out how to make consistent, accurate turns. More on this when I have it.