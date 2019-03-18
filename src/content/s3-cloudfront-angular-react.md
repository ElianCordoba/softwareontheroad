---
layout: post
title: "The perfect hosting for your react app 👌"
subtitle: "Use AWS S3 to host your web app and AWS CloudFront to delivery your content worldwide blazing fast ⚡"
author: santypk4
date: "2019-03-20T08:00:00.000Z"
image: img/s3-cloudfront.jpg
tags: ["AWS", "Best"]
twittertags: ["100daysofcode", "angular", "scalability", "react", "aws", "devops", "s3", "javascript", "webdev"]
draft: false
---

# You web application is ready to be released but, where will you host it? 

By using AWS S3 buckets as your hosting and AWS CloudFront as your content delivery network your website will be ready to handle large amounts of traffic.

In this tutorial, we will discuss how to implement a scalable hosting solution and distribution for your web application.

You need an AWS account. If you don't already have one, [follow this easy video tutorial.](https://www.youtube.com/watch?v=WviHsoz8yHk)

# Table of content
  - [What is AWS S3 ?](#s3)
  - [Setup AWS S3 Bucket](#setup-bucket)
  - [Enabling website hosting in AWS S3 Bucket](#setup-website)
  - [What is AWS CloudFront ?](#cloudfront)
  - [Setup AWS Cloudfront Distribution](#setup-distribution)
  - [Conclusion](#conclusion)

<a name="s3"></a>

# What is AWS S3? 🤔

  ![AWS S3](/img/s3-cloudfront-angular-react/s3.jpg)
  
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

  - Go to S3 service in the AWS Console and select Create Bucket

  ![Step 1 - Create AWS S3 Bucket](/img/s3-cloudfront-angular-react/step-1-create-bucket.png)

  - In the Bucket name field, type a unique ["DNS-compliant"](https://docs.aws.amazon.com/AmazonS3/latest/dev/BucketRestrictions.html) name for your new bucket

  - For Region, choose US East (N. Virginia) as the region where you want the bucket to reside.

  ![Step 2 - Confirm AWS S3 Bucket creation](/img/s3-cloudfront-angular-react/step-2-create-bucket-confirm.png)

  - Now go and upload your site to the S3 Bucket.

<a name="setup-website"></a>

  ## Configure your S3 bucket to be a static website hosting

  - Go to your bucket properties and look for the "Static Website Hosting" option

  ![Step 3 - AWS S3 Bucket properties](/img/s3-cloudfront-angular-react/step-3-bucket-properties.png)

  - Select the "entry point" file for your website. 

  If you are serving a react or angular single page application (SPA), this will be the **index.html**

  - Wrote down the endpoint URL.

  This is your website URL now.

  ![Step 4 - Enable AWS S3 Bucket static webhosting](/img/s3-cloudfront-angular-react/step-4-enable-static-webhosting.png)

  - Make sure your Bucket Policy is **Public**

  Go to the S3 Bucket Policy section and check that your configuration is correct.

  ![Step 5 - Check AWS S3 Bucket Policies](/img/s3-cloudfront-angular-react/step-5-bucket-policies.png)
  
  Congratulations! 
  
  Now you have your site running in AWS S3.

  **But, we can do it better.**

  Let's improve our page loading time with AWS Cloudfront

  ![Site speed with s3 and cloudfront](/img/s3-cloudfront-angular-react/speed_comparation.jpg)

<a name="cloudfront"></a>

# AWS CloudFront 🧙

  ![Cloudfront](/img/s3-cloudfront-angular-react/cloudfront.jpg)

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

  Let's go back to the AWS Console.

  - Navigate to AWS CloudFront service

  ![Step 6 - Open AWS Cloudfront](/img/s3-cloudfront-angular-react/step-6-go-cloudfront.png)

  - Select Create distribution

  ![Step 7 - Select create AWS Cloudfront distribution](/img/s3-cloudfront-angular-react/step-7-cloudfront-create-distribution.png)

  - Select Web distribution

  ![Step 8 - Select create web distribution](/img/s3-cloudfront-angular-react/step-8-cloudfront-select-web.png)


  - Configure Origins

  Origins are places where the distribution should look for content, in our case is the AWS S3 Bucket for our website that we created in the previous part.

  ![Step 9 - Select create web distribution](/img/s3-cloudfront-angular-react/step-9-select-origin.png)

  - Configure Cache Behaviours

  We want to redirect all HTTP request to HTTPS, after all HTTP sites will not be accepted anymore on chrome.

  Also, we want to allow all HTTP methods.

  ![Step 10 - Select https redirect](/img/s3-cloudfront-angular-react/step-10-select-redirect-http.png)

  - Select price class

  We are going to use all edge locations, I have clients in South America and Asia, so better go with all from the start.

  ![Step 11 - Select pricing](/img/s3-cloudfront-angular-react/step-11-cloudfront-select-ssl.png)

  - Just to make sure our origins are well configured, go to Origins tab and check the configurations.

  ![Step 12 - Check origins are well configured](/img/s3-cloudfront-angular-react/step-12-cloudfront-origins.png)

  - Invalidation Cache after each deploy

  This is very important, every time you push a new version of your website, you have to come here and create a Cache Invalidation.

  **If you forget, your users will see the old version of your website until the cache is refreshed.**

  [_Read how to do this automaticaly_](/continuous-integration-s3-cloudfront)

  ![Step 13 - Check origins are well configured](/img/s3-cloudfront-angular-react/step-13-cloudfront-invalidation.png)

  For this, I usually just set `*` which means invalidate all routes and resources.

  But you can go specific and prevent from invalidating some assets cache, like images and video.

  ![Step 14 - Check origins are well configured](/img/s3-cloudfront-angular-react/step-14-cloudfront-invalidation-create.png)

# Result

  Now you have your site ready under this CloudFront distribution URL. 

  You will want to create a DNS Alias pointing your domain to it.

  ![Step 15 - Results](/img/s3-cloudfront-angular-react/step-14-cloudfront-invalidation-create.png)

<a name="conclusion"></a>

# Conclusion 🎉

  With the combination of these two fantastic services, we can develop a scalable hosting and distribution solution our web application.

  We learn how by using AWS S3 we can storage or host our web application, and by using AWS CloudFront CDN we can handle a large amount of traffic without slowing down the page load speed.

  ![How the CloudFront edge works](/img/s3-cloudfront-angular-react/cdn.jpg)

  The costs of using this scalable infrastructure can vary depending on your traffic but for small sites should be almost free.

  [The next step is to use a continuous integration approach to have an efficient and automated way to make deploys](/continuous-integration-s3-cloudfront)
