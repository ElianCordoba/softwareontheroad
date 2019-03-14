---
layout: post
title: "The perfect hosting for your react app :some-emoji:"
subtitle: "Use AWS S3 to host your web app and CloudFront to delivery your content worldwide blazing fast :lighting:"
author: santypk4
date: "2019-03-21T08:00:00.000Z"
image: img/s3-cloudfront.jpg
tags: ["AWS", "Best"]
twittertags: ["angular", "scalability", "react", "aws", "devops", "s3", "javascript", "webdev"]
draft: true
---

# You react app, angular app, vue app is ready to be released live but, where will you hosting it? 

The answer can not be a FTP server of your cheap provider.

I mean, yeah you can do it for a while, maybe you are just starting but that will bring you troubles latter.

> Troubles in the worst moment, when you are having lot of traffic.

It's almost the same work uploading files to a FTP than doing it to an AWS S3 Bucket, don't be scare because of the big names here, AWS is for the begginers too!


# Table of content
  - What is AWS S3 ?
  - What is AWS CloudFront ?
  - Setup ...
  - Cost analysis
  - Conclusion

# What is AWS S3 ? :think-face:
  The service AWS S3, "simple storage service", is a ...

  Features:
    -
    -
    -
  
# What is CloudFront ? :cara-de-lucas:
  AWS ClodFront is a content delivery network (CDN), so it ...

  Features:
    -
    -
    -

 Image of comparation of a site with and without cloudfront

# Using it togherter

  With the combination of this two fantastic services we can develop a Hosting solution for our web application and setup a Content Delivery Network, so it loads amazingly fast.

# Let's do it! 

  ## Creating a bucket

  ## Setup web server

  ## Uploading your files

  ## Creating a Cloudfront Distributio

   Now go to CloudFront and create a new distribution

  ## Setup origins
    Origins are the place where the distributio should look for content

  ## Configuring routes


  ## Configuring cache

  ## Invalidating cache after each deploy

  ## Bonus - Setup your domain in Route53
    Go back to CloudFront distribution and set your desired CName
    Go to Route53 and create a CName, point it to cloudfront distribution



## If you don't care about the cost, you can go now! Have a nice day :smile-face:

# Cost analysis

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

# Wrapping up
  Storing files in AWS S3 bucket is an effective and cheap way to store your web application, regarless of the framework you choose (Angular, React, Vue, etc)

  By using cloudfront 

  As a bonus we configured the domain name.

  Continue learning ! 


# Resources
  - https://medium.com/devopslinks/this-is-how-i-reduced-my-cloudfront-bills-by-80-a7b0dfb24128