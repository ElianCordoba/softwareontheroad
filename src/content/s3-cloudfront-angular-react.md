---
layout: post
title: "The perfect hosting for your react app 👌"
subtitle: "Use AWS S3 to host your web app and AWS CloudFront to delivery your content worldwide blazing fast ⚡"
author: santypk4
date: "2019-03-21T08:00:00.000Z"
image: img/s3-cloudfront.jpg
tags: ["AWS", "Best"]
twittertags: ["angular", "scalability", "react", "aws", "devops", "s3", "javascript", "webdev"]
draft: true
---

# You web application is ready to be released but, where will you host it? 

**By using AWS S3 buckets as your hosting and AWS CloudFront as your content delivery network your website will be ready to handle large amounts of traffic.**

In this tutorial, we will discuss how to implement a scalable hosting solution and distribution for your web application.

You need an AWS account. If you don't already have one, (follow this easy tutorial.)[LINK]

# Table of content
  - [What is AWS S3 ?](#s3)
  - [Setup AWS S3 Bucket](#setup-bucket)
  - [Enabling website hosting in AWS S3 Bucket](#setup-website)
  - [What is AWS CloudFront ?](#cloudfront)
  - [Setup AWS Cloudfront Distribution](#setup-distribution)
  - [Cost analysis](#costs)
  - [Conclusion](#conclusion)

<a name="s3"></a>

# What is AWS S3? 🤔

  [Imagen de cajas o containers o barcos con containers]
  
  Amazon S3 stores data as objects within buckets.
  An object consists of a file and optionally any metadata that describes that file.

  To store an object in Amazon S3, you upload the file you want to store to a bucket. 

  When you upload a file, you can set permissions on the object as well as any metadata

  **Features:**

  - Encryption to the data that you store
  - Multiple copies are maintained to enable regeneration of data in case of data corruption
  - It regularly verifies the integrity of data stored using checksums e.g. if S3 detects there is any corruption in data, it is immediately repaired with the help of replicated data.

<a name="setup-bucket"></a>

  ## Creating a bucket

  - In the Bucket name field, type a unique DNS-compliant name for your new bucket

  - For Region, choose US West (Oregon) as the region where you want the bucket to reside.

<a name="setup-website"></a>

  ## Configure your bucket to be a web server
  
  Now you have your site running in that URL, but that's not so efficient. 
  If your clients are far from the region you chose, the page load speed will be low...

  ![Site speed with s3 and cloudfront](/img/s3-cloudfront-angular-react/speed_comparation.jpg)

<a name="cloudfront"></a>

# AWS CloudFront 🧙

  [some image for cloudfront]

  AWS CloudFront speeds up the distribution of your web content (HTML, CSS, js, image, video, etc) to your users.
  It delivers your content through a worldwide _network of data centers_ called **edge locations**. 

  When a user requests content that you're serving with AWS CloudFront, the user is routed to the _edge_ location that provides the lowest latency, so that content is delivered with the **best possible performance.**

  **Features:**

  - Protection against Network and Application Layer Attacks
  - SSL/TLS Encryptions and HTTPS
  - Increase application availability 
  - Free data Transfer between AWS cloud services and Amazon CloudFront

  **The idea is to use CloudFront as a proxy to our AWS S3 bucket**

 ![Architecture overview](/img/s3-cloudfront-angular-react/architecture.png)

<a name="setup-distribution"></a>

  ## Creating a CloudFront Distribution

   Now go to CloudFront and create a new distribution

  ## Setup origins
    Origins are the place where the distribution should look for content

  ## Configuring routes


  ## Configuring cache

  ## Invalidating cache after each deploy

  ### If you don't care about the cost, you can go now! Have a nice day and share this article with your fellows 😃

<a name="cost"></a>
# Cost analysis 💰

  [Imagen de personas haciendo cuentas en papel, o de contadores, o de plata]

  As a part of the AWS Free Usage Tier, you can get started with AWS S3 for free. Upon sign up, new AWS customers receive 5 GB of Amazon S3 standard storage, 20,000 Get-Requests, 2,000 Put-Requests, and 15GB of data transfer-out each month for one year.

# AWS S3 Pricing
  - Image of S3 storage pricing
  - Image of S3 bandwidth pricing

# AWS CloudFront pricing
  - Image of CloudFront pricing

# Estimated total

  Let's say you have a SPA written in React or Angular, the bundle shouldn't be large than 2 MB.

  If so, you should optimize the bundle size! Large bundles slow downs the page speed and generate bad user experience.

  And you get 50.000 visitors monthly, from the US, Europe, and Asia.

  Cost storage + Cost bandwith + Cost cloudfront US + Cost cloudfront EU + Cost Asia


<a name="conclusion"></a>

# Conclusion 🎉

  With the combination of these two fantastic services, we can develop a scalable hosting and distribution solution our web application.

  We learn how by using AWS S3 we can storage or host our web application, and by using AWS CloudFront CDN we can handle a large amount of traffic without slowing down the page load speed.

  ![How the CloudFront edge works](/img/s3-cloudfront-angular-react/cdn.jpg)

  The costs of using this scalable infrastructure can vary depending on your traffic but for small sites should be almost free.

  [The next step is to use a continuous integration approach to have an efficient and automated way to make deploys](/continuous-integration-s3-cloudfront)

# Resources
  - https://medium.com/devopslinks/this-is-how-i-reduced-my-cloudfront-bills-by-80-a7b0dfb24128