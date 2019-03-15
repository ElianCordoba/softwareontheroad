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

# You web application is ready to be released but, where will you hosting it? 

**By using AWS S3 buckets as your hosting and AWS Cloudfront as your content delivery network your website will be ready to handle large amounts of traffic.**

In this tutorial we will discuss how to implement a scalable hosting solution and distribution for your web application.

You need an AWS account. If you don't already have one, (follow this easy tutorial.)[LINK]

# Table of content
  - What is AWS S3 ?
  - Setup AWS S3 Bucket
  - Enabling website hosting in AWS S3 Bucket
  - What is AWS CloudFront ?
  - Setup AWS Cloudfront Distribution
  - Cost analysis
  - Conclusion

[Imagen de cajas o containers o barcos con containers]

# What is AWS S3 ? 🤔
  
  Amazon S3 stores data as objects within buckets. An object consists of a file and optionally any metadata that describes that file.
  To store an object in Amazon S3, you upload the file you want to store to a bucket. When you upload a file, you can set permissions on the object as well as any metadata

  **Features:**

    - Encryption to the data that you store
    - Multiple copies are maintained to enable regeneration of data in case of data corruption
    - It regularly verifies the integrity of data stored using checksums e.g. if S3 detects there is any corruption in data, it is immediately repaired with the help of replicated data.

  ## Creating a bucket

    - In the Bucket name field, type a unique DNS-compliant name for your new bucket

    - For Region, choose US West (Oregon) as the region where you want the bucket to reside.

  ## Configure your bucket to be a web server
  

  Now you have your site running in that url, but that's not so efficient. 
  If your clients are far from the region you choosed, the page load speed will be low...

  What you want is a content distribution network that handle...

[]

# AWS CloudFront 🧙

  AWS CloudFront speeds up distribution of your web content (html, css, js, image, vide, etc) to your users.
  It delivers your content through a worldwide _network of data centers_ called **edge locations**. 

  When a user requests content that you're serving with AWS CloudFront, the user is routed to the _edge_ location that provides the lowest latency, so that content is delivered with the **best possible performance.**

  **Features:**

    -
    -
    -

 Image of comparation of a site with and without cloudfront


# Let's do it! 

  ## Uploading your files

  ## Creating a Cloudfront Distribution

   Now go to CloudFront and create a new distribution

  ## Setup origins
    Origins are the place where the distributio should look for content

  ## Configuring routes


  ## Configuring cache

  ## Invalidating cache after each deploy

  ## Bonus - Setup your domain in Route53
    Go back to CloudFront distribution and set your desired CName
    Go to Route53 and create a CName, point it to cloudfront distribution



## If you don't care about the cost, you can go now! Have a nice day and share this article with your fellows :smile-face:

# Cost analysis 💰

  [Imagen de personas haciendo cuentas en papel, o de contadores, o de plata]

  As a part of the AWS Free Usage Tier, you can get started with AWS S3 for free. Upon sign up, new AWS customers receive 5 GB of Amazon S3 standard storage, 20,000 Get-Requests, 2,000 Put-Requests, and 15GB of data transfer-out each month for one year.

# AWS S3 Pricing
  - Image of S3 storage pricing
  - Image of S3 bandwith pricing

# AWS CloudFront pricing
  - Image of cloudfront pricing

# Estimated total

  Let's say you have a SPA written in React or Angular, the bundle shouldn't be large than 2 MB.

  > If so, you should optimize the bundle size ! Large bundles slow downs the page speed and generate bad user experience.

  And you get 50.000 vistors monthly, from the US, Europe and Asia.

  Cost storage + Cost bandwith + Cost cloudfront US + Cost cloudfront EU + Cost Asia


<a name="conclusion"></a>

# Conclusion 📝

  With the combination of this two fantastic services we can develop a scalable hosting and distribution solution our web application.

  We learn how by using AWS S3 we can storage or host our web application, and by using AWS Cloudfront CDN we can handle large amount of traffic without slowing down the page load speed.

  The costs of using this scalabe infraestructre can may vary depending on your traffic but for small sites should be almost free.

  (The next step is to use a continuous integration approach to have an efficient and automated way to make deploys)
  [LINK-TO-CIRCLECI-S3]

# Resources
  - https://medium.com/devopslinks/this-is-how-i-reduced-my-cloudfront-bills-by-80-a7b0dfb24128