---
title: Catching Up With React
permalink: /blog/2021/{{title | slug }}/
layout: blog-article-layout.njk
date: 2021-03-20
breadcrumbs:
    - label: Home
      url: /
    - label: Blog
      url: /blog/
    - label: Catching Up With React
tags:
  - posts
---

I've been asked to add authentication to protect certain resources on a static site. At first, I kept thinking, "um, static site, no backend server" and wondered how it might be possible to do that. Fortunately, AWS offers an authentication service that can be accessed via a Javascript call. Problem solved, I thought, until upon further investigation it seemed that the Javascript library offered by AWS is for React.

Sigh...

So I headed out to discover what was available from Udemy and a couple of other sources. I'm just about done with the React course Brad Traversy offers, [React Front to Back](https://www.udemy.com/course/modern-react-front-to-back/), which starts with a project using classes-based React that gets refactored into a functional object-based version where Brad explains the ins and outs as well as the rationale behind his choices. The second project creates a React Router backend API that integrates with MongoDB Atlas and then creates a React-based front end that integrates with the React Router backend. The final project explores the use of Redux which sort of finishes out things. What I really like about Brad's courses is that they are based on actual hands-on work by someone who is a practitioner. His teaching style is easy-going but informative and the course has been a really good jumpstart for me in learning React.

I'm also going to be taking a couple of courses by Dave Ceddia called [Pure React](purereact.com) and [Pure Redux](https://daveceddia.com/pure-redux) with the intention of deeper learning through iteration. I'll post more on that when I get through them.

In any case, I'm heartened to see that I'm not going to have to re-invent the wheel from scratch!