---
title: mBot and IR Transmit and Receive
permalink: /blog/mbot-and-ir-transmit-and-receive/
layout: blog-article-layout.njk
date: 2017-07-12
breadcrumbs:
    - label: Home
      url: /
    - label: Blog
      url: /blog/
    - label: mBot and IR Transmit and Receive
tags:
    - posts
---

In my first book I avoided the IR Transmit and Receive devices other than using the included IR remote that comes with the mBot. Some of that had to do with not being able to get the test programs in Scratch to work, but a lot of it was more because I couldn't think of an application for a single mBot. That's still the case, but I've got an idea for an application with two or more mBots that will appear in volume 2 of the "A Gentle Introduction to Robotics" series. That being said, I wanted to share a couple of test apps that I've written  so that you can go forth and be creative if you have a couple of mBots (and really, who wouldn't want to have two?).

This is a simple IR Receive program:

File: IR_Receive_Test.ino

```
 1 #include <Arduino.h>
 2 #include <Wire.h>
 3 #include <SoftwareSerial.h>
 4 
 5 #include <MeMCore.h>
 6 
 7 MeIR ir_receiver;
 8 
 9 #include <MeMCore.h>
 10 
 11 void setup() {
 12 Serial.begin(9600);
 13 ir_receiver.begin();
 14 }
 15 
 16 void loop() {
 17 Serial.println("IR Code: " + ir_receiver.getString());
 18 }
 ```

And a simple IR Send program:

```
 1 #include <Arduino.h>
 2 #include <Wire.h>
 3 #include <SoftwareSerial.h>
 4 
 5 #include <MeMCore.h>
 6 
 7 MeIR ir;
 8 
 9 #include <MeMCore.h>
 10 
 11 void setup() {
 12 Serial.begin(9600);
 13 ir.begin();
 14 }
 15 
 16 void loop() {
 17 ir.sendString("Winning");
 18 Serial.println("Sending IR String: Winning" );
 19 }
 ```

 <div class="center-text">

[Originally published on _Robotic Ramblings_]

</div>