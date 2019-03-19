---
layout: post
title: "3 node.js scalability issues and how to solve them 🗼"
author: santypk4
date: "2019-03-22T08:00:00.000Z"
image: img/node-scalability.jpg
subtitle: "These scalability issues are the most commont in many projects, but is not hard to fix them 🤟"
tags: ["Node.js", "Best"]
twittertags: ["node", "scalability", "backend", "programming", "devops", "javascript"]
draft: false
---

# How to scale node.js applications? 🤔

  Scaling servers never have to be with the technology behind, but with the problem, they are aimed to solve.

  Netflix uses node.js for its microservices infrastructure, but they have a video streaming platform that needs to serve a million concurrent connections.

  A node.js backend for a real-time chat application can handle a different load that an e-commerce app.
  Here are some considerations and common issues that many development teams face at the moment of scaling a node.js application.

# Table of contents 📝

 - [Serving static assets with express](#assets)
 - [Jobs and Workers](#jobs)
 - [Using all the resources](#resources)
 - [Conclusion](#conclusion)

  I worked for a couple of startups who started their software products just from a simple express.js template that we found on GitHub.

  At Whyline for example, back in 2015, I was who installed the ["Angular Full-Stack"](https://github.com/angular-fullstack/generator-angular-fullstack) template from Yeoman (Oh boy I'm old).

  The product grows fast, and in the process, we had to almost re-write the backend server, change the semi-monolithic architecture to a microservices, move the web-client to a CDN.

  And so many other things, performance improvements in Linux AMIs, refactors to several layers, typescript appears, re-write services, pub-sub, sockets, implement patterns, search solution, Redis, and so.

  _It will take me a whole year to write about all_

  Now, I work as a freelancer, and every new project that I arrived has this same scalability issues, so today I want to talk about how they are holding back your node.js server from growing and reaching a high scalability state.

<a name="assets"></a>

# Serving static assets 📦

  Why do you have your angular or react app served by express?

  Node.js wasn't designed to serve static assets, 

  You should be using a CDN like CloudFront. 

  I believe the root of the problem comes from the amount of starter templates that comes with a "full-stack" solution for building an MVP.

  But when your product and user base grows, you will face a problem, your servers will use too many CPU time.

  Also, having the server and the client in the same repository, one inside of the other was a problem for us, the front-end team sent too many changes that the backend team didn't care and slow down the backend releases. 

  The same was the other way around.

  COMPARISON CPU% WITH AND WITHOUT CLIENT CODE

  [Check this article on how to implement AWS S3 + AWS Cloudfront for doing this task.](/s3-cloudfront-angular-react)

  [Also you can use Netlify which is totally free for 100GB network traffic monthly and 1TB traffic for paid accounts.](https://www.netlify.com/tos/)

  As an example of how much is it, this blog is hosted on Netlify and each page weight almost 800kb, so I can have around 100.000 visits/month for free.

<a name="jobs"></a>

  # A good task scheduler ⏰

  It's so common needing some kind of recurring task, maybe you need to fire a reminder for a user once a day, or calculating the billing of the service for a customer once a month.

  But you shouldn't rely on simple `setTimeout` or `setInterval` for doing such tasks.

  This will bring you troubles when you will try to scale horizontally your servers, the cron jobs will be duplicated and chaos can occur.

  Also, what happens every time your server reboot? you just recalculate the next time the cron should run? what happens if the task fails?

  How do you know what task is scheduled to run? How do you run it manually?

  It's a better approach to use a task scheduler framework like Agenda.js who has a separate module for an admin dashboard.

  HOW TO USE AGENDA

  HOW TO INSTALL AGENDASH

  HOW TO SECURE AGENDASH

<a name="resources"></a>

# Using all the resources 💰

  Is 2019 and still most developers don't use the cluster feature that comes built-in in node since version 0.10; [TENGO QUE CHECKEAR ESTO]

  It may seem scary to try this out in your already in production server, but you don't have to worry, unless, you are using some type of home-made CRON in the same server that runs your API.

  [Don't worry, in the previous section we talk about this.](/#jobs)

  The code implementation is pretty straight forward, just go to your node.js entry point and make some adjustments.

  Also, I recommend you checking out my guide on a good folder structure for your node.js server.

  HOW TO DO CLUSTERING

<a name="conclusion"></a>

# Conclusion

  I guaranty you that you will be able to handle more traffic if you follow these considerations.

  Serving static assets with node.js is a task that demands a lot of CPU, node.js wasn't designed for that.

  Having your cron jobs inside Agenda will benefice you at the moment of doing horizontal scalability.

  And don't forget to enable the power of cluster mode from day 1 to make use of all the resources available in the machine.

  My experience has tough me that scaling the servers is not the issue once you reach some level (dozens of ec2 machines doing serving your API and pretty well) but scaling the database, and that my friend is a story for another day.

# Resources
