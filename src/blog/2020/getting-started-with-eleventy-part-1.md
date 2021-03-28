---
title: Getting Started With Eleventy Part 1
layout: blog-article-layout.njk
permalink: /blog/2020/{{ title | slug }}/
date: 2020-12-18
breadcrumbs:
  - label: Home
    url: /
  - label: blog
    url: /blog/
  - label: Getting Started With Eleventy Part 1
tags:
  - posts
  - eleventy
---
## Overview

This tutorial provides a simple walkthrough to set up the Eleventy development environment and create a simple site. This article was written with a slant towards Visual Studio Code as the development editor. If you are using something else (Atom, Sublime, etc.) you will need work out the steps for your environment.

(All source code is available at [Github <i class="fa fa-link fa-1x"></i>](https://github.com/cmcknight/learning-eleventy))

## Setting up the Environment
Eleventy requires several tools to be installed before you can begin to work with the static site generator. See the [Development Environment Setup](/development/dev-env-setup/) article for those details. You can skip the step for sending your email to the technical lead because the Git repository used for this example is a public repository.

## Cloning the Git Repository

The following instructions are for Visual Studio Code. If you are using a different editor, you will need to work out what steps work for your environment.

**1. Open Visual Studio Code.**

<div class="center-image">
<img src="/img/getting-started-with-eleventy/open-vs-code.png" alt="Open the Visual Studio Code Editor" style="max-width: 30%;">
<figcaption>Figure 1: Open the Visual Studio Code Editor</figcaption>
</div>

**2. Click the File Menu to open a new window**

<div class="center-image">
<img src="/img/getting-started-with-eleventy/open-new-window.png" alt="Open A New Window from the File Menu" style="max-width: 25%;">
<figcaption>Figure 2: Open A New Window from the File Menu</figcaption>
</div>

<div class="center-image">
<img src="/img/getting-started-with-eleventy/open-new-window-2.png" alt="New Window Opened" style="max-width: 35%;">
<figcaption>Figure 3: New Window Opened</figcaption>
</div>

**3. From the View menu, click the SCM men**

<div class="center-image">
<img src="/img/getting-started-with-eleventy/view-menu-scm.png" alt="Select the SCM menu item from the View Menu" style="max-width: 25%;">
<figcaption>Figure 4: Select the SCM menu item from the View Menu</figcaption>
</div>

**4. Click the Clone Repository Button**

<div class="center-image">
<img src="/img/getting-started-with-eleventy/clone-repo-1.png" alt="Click the Clone Repository Button" style="max-width: 25%;">
<figcaption>Figure 5: Click the Clone Repository Button</figcaption>
</div>

**5. You should now see a control at the top of the editor. Click the Clone from Github option.**

<div class="center-image">
<img src="/img/getting-started-with-eleventy/clone-repo-2.png" alt="Clone Repository Control" style="max-width: 40%;">
<figcaption>Figure 6: Clone Repository Control</figcaption>
</div>

**6. Select the _cmcknight/learning-eleventy_ Repository**

Type: ```cmcknight/learning-eleventy``` in the clone repository field.

<div class="center-image">
<img src="/img/getting-started-with-eleventy/clone-repo-3.png" alt="Select Repository" style="max-width: 40%;">
<figcaption>Figure 6: Select Repository</figcaption>
</div>

**7. Open Cloned Repository in Same Window**

You will now see the following dialog at the bottom right of the Visual Studio Code window:

<div class="center-image">
<img src="/img/getting-started-with-eleventy/clone-repo-4.png" alt="Open Repository in the current Visual Studio Code window" style="max-width: 40%;">
<figcaption>Figure 7: Open Repository in the Current Visual Studio Code Window</figcaption>
</div>

Click the open button shown in Figure 7 to open the newly cloned repository in the current Visual Studio Code window. You should see the following screen (or something that closely resembles it).

<div class="center-image">
<img src="/img/getting-started-with-eleventy/clone-repo-5.png" alt="Repository loaded into Visual Studio Code" style="max-width: 40%;">
<figcaption>Figure 8: Repository loaded into Visual Studio Code</figcaption>
</div>

## Eleventy Projects

Eleventy is relatively unopionated with regard to how you wish to organize your project, the template language used, etc. While this provides great flexibility, it can be overwhelming at times. Therefore, it is recommended that projects have a structure that resembles the following:

<div class="center-image">
<img src="/img/getting-started-with-eleventy/eleventy-project-structure.png" alt="Eleventy Project Structure" style="max-width: 40%;">
<figcaption>Figure 9: Eleventy Project Structure</figcaption>
</div>

However, this should not be taken as an end-all / be-all file structure because each projects has its own needs. Also note that Git does not archive empty folders, so the following folders are not present in the Github repository.

* _data - any data required by the project
* blog - blog post files
* js - Javascript files
* pages - web page files
* partials_layouts - component and page layout files


Click on the right chevrons (>) for the src and css folders. You should see something that resembles Figure 10:

<div class="center-image">
<img src="/img/getting-started-with-eleventy/project-files.png" alt="Eleventy Project Files" style="max-width: 40%;">
<figcaption>Figure 10: Eleventy Project Files</figcaption>
</div>

### Building the Project

You will need to open a live terminal in Visual Studio Code so that you can compile the current code and then launch the live reload server.

**1. Open the Terminal Menu and click New Terminal.**

<div class="center-image">
<img src="/img/getting-started-with-eleventy/open-live-terminal.png" alt="Open a Live Terminal" style="max-width: 25%;">
<figcaption>Figure 11: Open a Live Terminal</figcaption>
</div>

You should see a pane open at the bottom of the window:

<div class="center-image">
<img src="/img/getting-started-with-eleventy/live-terminal.png" alt="Live Terminal" style="max-width: 40%;">
<figcaption>Figure 12: Live Terminal</figcaption>
</div>


**2. Perform the first build of the Site**

In the live terminal, enter ```npm run build``` and tap the Enter key.

<div class="center-image">
<img src="/img/getting-started-with-eleventy/build-project-1.png" alt="Run Build Script" style="max-width: 50%;">
<figcaption>Figure 13: Run Build Script</figcaption>
</div>

You should see the following:

<div class="center-image">
<img src="/img/getting-started-with-eleventy/build-project-2.png" alt="Build Script After Running" style="max-width: 50%;">
<figcaption>Figure 14: Build Script After Running</figcaption>
</div>

You should also see a folder named _dist_ in the file structure. Click the right chevron (>) to open it and the css folder within the dist folder.

<div class="center-image">
<img src="/img/getting-started-with-eleventy/post-build-file-structure.png" alt="Post-Build File Structure" style="max-width: 40%;">
<figcaption>Figure 15: Post-Build File Structure</figcaption>
</div>

### Running the Live Reload Server

Eleventy packages a built-in web server that will allow you to view the site. The live reload feature has Eleventy watching for changes to any of the source files. If a change occurs, the site will be refreshed automatically. If you are working on a page, you can see the changes you make every time you save the file. This capability is extremly helpful when you are creating content because you can see exactly what is happening without having to constantly start a web server.

**NOTE**: If there are errors you will see them displayed in the live terminal, so if you are making changes and nothing seems to be happening, check the live terminal to see if any errors have occurred.

To run the live server, you will need to enter ```npm run dev``` in the live terminal.

<div class="center-image">
<img src="/img/getting-started-with-eleventy/live-reload-server-1.png" alt="Running the Live Reload Server" style="max-width: 50%;">
<figcaption>Figure 16: Running the Live Reload Server</figcaption>
</div>

You should now see the following in your live terminal:

<div class="center-image">
<img src="/img/getting-started-with-eleventy/live-reload-server-2.png" alt="Live Reload Server Running" style="max-width: 40%;">
<figcaption>Figure 17: Live Reload Server Running</figcaption>
</div>

Here's a quick breakdown of what that data means:

<div class="center-table">

<table>
<thead>
  <tr><th></th><th>URL<sup>1</sup></th><th>Port<sup>2</sup></th><th>Description</th></tr>
</thead>
<tbody>
<tr><td>Local</td><td>http://localhost:8080</td><td>8080</td><td>Internal web server address for site</td></tr>
<tr><td>External</td><td>http://192.168.1.36:8080</td><td>8080</td><td>External web server aaddress for site</td></tr>
<tr><td>UI</td><td>http://localhost:3002</td><td>3002</td><td>Browsersync management console internal web server address</td></tr>
<tr><td>UI External</td><td>http://localhost:3002</td><td>3002</td><td>Browsersync management console internal web server address</td></tr>
</tbody>
</table>
</div>

<sup>1</sup> The URL may vary for the _External_ address for the web server. As a general rule, developement is performed against the _Local_ web server although in commercial environments you may find that there is a designated server for all testing.

<sup>2</sup> The actual port may vary depending on what else is listening on ports. Eleventy checks to see if the first "public" port is availabe (8080), and increments the port number by one automatically until it finds an open port.

Open your browser and enter the address shown in your live terminal window into the location then tap the Enter key.

<div class="center-image">
<img src="/img/getting-started-with-eleventy/viewing-the-site-1.png" alt="Viewing the Site" style="max-width: 50%;">
<figcaption>Figure 18: Viewing the Site</figcaption>
</div>

You should see the following in your browser:

<div class="center-image">
<img src="/img/getting-started-with-eleventy/viewing-the-site-2.png" alt="Viewing the Site" style="max-width: 50%;">
<figcaption>Figure 19: Viewing the Home Page</figcaption>
</div>

**UPDATE** The site was restyled for a better appearance and the stylesheet updates are in the repo.

## Wrap Up

In this tutorial we have covered the steps necessary to clone a repository from Github and to get the learning project set up, compiled, and running. [Part 2](/blog/getting-started-with-eleventy-part-2/) of the tutorial will start with the conversion of the home page into a Nunjucks template.

<br>
