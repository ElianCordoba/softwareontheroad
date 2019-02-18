---
layout: post
title: How to upload files to a private S3 bucket from client side (Easy Guide)
author: santypk4
date: "2019-02-01T00:00:00.000Z"
image: img/writing.jpg
tags: ["s3", "aws", "devops", "backend", "javascript", "node.js", "how-to", "guide", "getting-started"]
draft: true
---

  # Simple steps to generate signed urls and improve your uploading experience
  <!-- end -->

  The thing is I already have a working upload solution but the file goes first to the server and then the server uploads it to the S3 bucket.

  This is a performance problem for my clients, they are across the world, and uploading a 70MB file from Singapour to the server that's somewhere in the US, and then the server uploads it again to my main bucket on Frankfurt, well boy you gotta have problems.
  
  # Well let's do this, should be easy thought. 

  I think that I scanned the entery Internet and there is no easy to follow tutorial, everybody is talking about pre-signed v2 vs pre-signed v4, come on people what the fuck is that, why cloud computing guys always have to overcomplicate the simple things? 

  This is pretty easy, every human should be able to do this.
  

  <img src="https://docs.aws.amazon.com/AmazonS3/latest/API/images/s3_post.png" alt="s3 upload flow">

  # Walkthrough
  <ul> 
    <li> Configure your bucket to accept PUT calls from your webhost (some CORS configs)</li>
    <li> Create an endpoint on your server to optain a signed url <i> just a fancy name for a type of credential</i> </li>
    <li> On your client, call to the server endpoint to get a signed url where to upload your file, then upload the file to there</li>
    <li> Go and ask for a raise, your a Dev-Ops Cloud Engineer now</li>
  </ul>

  <code> 
    /* Somewhere in your server */
    const express = require('express')
    // in my middlewares I check if the user is authenticated and have authorization to
    // upload the file
    const myMiddlewares = require('../my-middlewares');
    const AWS = require('aws-sdk');
    const s3 = new AWS.S3({
      signatureVersion: 'v4',
    });

    const router = express.router('file')

    router.get('generate-signed-url', myMiddlewares.auth, (req, res) => {
      const url = s3.getSignedUrl('putObject', {
        Bucket: '**\[YOUR-S3-BUCKET\]**',
        Key: 'mykey',
        Expires: 10,
      });
      return res.send(url).end();
    })
  </code>

  <code> 
    /* Somewhere in your client code */
    const AWS = require('aws-sdk');
    const file = myblobfile;
    const s3 = new AWS.S3();
    // Or just use the classic XMLHttpRequest API, I'm too young to put an example of that
    fetch('api.mydomain.com/files/generate-signed-url', (res) => {
      const options = {

      }
      const upload = s3.upload(options).promise();
      return upload;
    })
  </code>


  <h1> WAIT! There is more</h1>

  Now your clients are happy, your boss thinks you are awesome, and you think that you are a great devops now, but you can always be better.

  There is another tool to improve the upload performance even more, as we discuss your clients can be across the world, and beside the file is not uploaded twice, first to N. Virginia and then to Frankfurt, it is still slow for a client in Latin America or Asia.
  But people at AWS are very clever and face this problem years ago.

  Introducing S3 Transfer Acceleration, it uses the tecnology behind AWS Edge (just another fancy name for some product) that's behind CloudFront (a content distribution tecnology)

  Now you go to your S3 options
  **Scroll down** and activate S3 Accelerated Transfer

  It gives you a new S3 Bucket URL so we have to update our code.

  That's it, yo go and ask your manager for a bonus and more work-from-home days or even conven him that you can work fully remotly, just doing AWS things.

  That's it my borther, hope to see you soon, maybe around the world.

  # Resources

  - https://www.digitalocean.com/community/questions/signed-put-url-for-nodejs

  - https://sanderknape.com/2017/08/using-pre-signed-urls-upload-file-private-s3-bucket/

  - https://docs.aws.amazon.com/AmazonS3/latest/API/sigv4-UsingHTTPPOST.html

  <div class="col-sm-12 text-center"> 
    <div class="alert alert-info" role="alert">
      <h3 class="alert-heading"> Stay in touch! </h3>
      <a href="https://www.linkedin.com/in/santiagoquinteros/">
        <button type="button" class="btn btn-block btn-success btn-lg"> Add me on LinkedIn</button> 
      </a>
    </div>
  </div>