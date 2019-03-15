---
layout: post
title: "How to start using continuous integration in your web app 🚀"
subtitle: "Get continuous integration and delivery to AWS S3 easily for your React or Angular app by using CircleCI"
author: santypk4
date: "2019-03-15T08:00:00.000Z"
image: img/circleci-s3.jpg
tags: ["AWS", "Best"]
twittertags: ["node", "scalability", "backend", "100daysofcode", "programming", "devops", "javascript", "continuousdelivery"]
draft: false
---

  # Use CircleCI and automate your deploys for free 🚢

  In a future post, we will discuss how to implement an AWS S3 bucket as hosting for your web application, and an AWS CloudFront distribution as your content distribution network to deliver your web application in a scalable way.

  But first, we need an efficient way to manage several environments.

  > After all, if you have one million users you don't want to mess up your site by using a bad CLI command.

  We need to have our infrastructure automatized, and those configurations must be **INSIDE a version control tool** like GIT or SVN.

  _(just kidding, who use SVN these days?)_ 

  I'm a big fan of **CircleCI**, I have been using it since version 1 in 2015 when I was looking for a cheap alternative to TravisCI but also an easier alternative to Jenkins.

  Let's deep dive into a Continuous Integration solution for your web application using CircleCI.

  # Table of contents

  - [Why implementing continuous integration? 🤔](#why)
  - [The circleci config file 🙌](#config)
  - [Explanation 🍿](#explanation)
      - [Testing suit 👮](#tests)
      - [Packing application 🔮](#packing)
      - [Uploading to AWS S3 bucket 📦](#deploy)
      - [CloudFront distribution 🕵️‍♂️](#cache)
  - [Conclusion](#conclusion)

<a name="why"></a>

# Why continuous integration and delivery ? 🤔 

  ![Continuous Integration Diagram](/img/circleci-s3/ci.png)
  
  When your team is small, or when there are too many things to have in mind, is easy to forget details, like invalidate the CloudFront cache after a deploy. 
  _You may end up never seeing your update in the live environment otherwise._

  Or when that guy who does the deploys is sick and can't push the button, what do you do? Pospouse your production release?

  To prevent all of this shenanigans, here is a **CircleCI** configuration that will deploy 
  your frontend code to **S3** and will invalidate your **CloudFront cache** after a merge to the desired branch.

<a name="config"></a>  

  # CircleCI configuration file 🙌

  `gist:santiq/dee9d7707cf98d4bd0cfa80093495e25`

<a name="explanation"></a>

  ## Explanation 🍿

  Here we deploy our code to the AWS S3 bucket based on the target branch that was merged.

  You can go all crazy here, and [use semantic versioning, setting up regex rules to decide when a tag](https://stackoverflow.com/questions/48665499/circle-ci-job-on-tags-matching-regex) version is ready to publish to production or to beta.

  The approach here is more classic.

  You have your _master_ branch where all code is merged, then the _staging_ branch is where you merge master when is stable enough to be ready for QA manual revision.

  Then _production_ branch is merged with master after all acceptance tests were run and everybody is happy.

<a name="tests"></a>

  ## Run your Tests! 👮

  Please run your tests and make sure they pass before attempting any deployment.
  And remember to emit an error if your test fails so the deployment stops.

  > Look my friend, I'm not your manager you can skip this step but please think in your customers.

  ```bash
  "testing":
    docker:
      - image: circleci/node:10-stretch
    working_directory: ~/repo
    steps:
      - checkout
      - restore_cache:
          keys:
          - app-{{ checksum "package.json" }}
          # fallback to using the latest cache if no exact match is found.
          - app-
      - run: npm install
      # Save node_modules into cache with a checksum of the package.json.
      - save_cache:
          paths:
            - node_modules
          key: app-{{ checksum "package.json" }}
      # PLEASE run your tests.
      - run: npm run test 
  ```

<a name="packing"></a>

  ## Prepare your artifact 🔮

  How you generate your artifact is entirely up to you.

  In my case, I'm deploying an Angular2 application.

  The `npm run build` generates a production build in the `dist` folder, [so just by zipping that I was ready.](https://unix.stackexchange.com/questions/182032/zip-the-contents-of-a-folder-without-including-the-folder-itself)

  ```bash
    - run:
      name: Preparing Artifact
      command: |
        npm install
        npm run build 
        cd dist       
        zip ../build.zip -r * .[^.]*
        echo "Artifact generated!"
  ```

<a name="deploy"></a>

  ## The deploy to S3 bucket 📦

  Here we are using a simple approach, checking what branch we are currently building on, and deciding to what S3 bucket we should deploy our code.

  ```bash
    if [ "${CIRCLE_BRANCH}" == "production" ]  # Check current branch to decide to which S3 bucket deploy.
    then
      # Aggressively replace your files
      aws s3 sync ~/repo/dist s3://yoursite.com --delete  

      # Invalidate Cloudfront Cache
      aws cloudfront create-invalidation --distribution-id DISTRIBUTION_ID_YOUR_SITE_PRODUCTION --paths /\* 
    elif [ "${CIRCLE_BRANCH}" == "staging" ]
    ...
  ```

  > _The term "deploy" is used here as a fancy word for copy, pasting and replacing files_

<a name="cache"></a>

  ## CloudFront Cache invalidation 🕵️‍♂️
  
  **The crucial detail** ✨

  ```bash
    aws cloudfront create-invalidation --distribution-id DISTRIBUTION_ID_YOUR_SITE_PRODUCTION --paths /\*
  ```

  When you update your AWS S3 bucket files, AWS CloudFront will not care, because his job is to act as a cache layer.

  You have to tell him that you want to "clean" the "cache".

  Please tweak this as you please, maybe you want to exclude images cache from being refreshed.

<a name="conclusion"></a>

# Wrapping up 🎉

  In this tutorial, we learned all the basic and necessary steps to create a continuous integration and continuous delivery solution for S3 and CloudFront by using the awesome CircleCI tool.
  
  Archiving continuous integration is something that worths the time investment.
  It will pay you in a lot of time saved and human error prevention.

## Please share this post with your coworkers!

# Resources

- https://stackoverflow.com/questions/47344338/running-circleci-2-0-workflows-on-tags-regex
- https://stackoverflow.com/questions/48665499/circle-ci-job-on-tags-matching-regex
- https://unix.stackexchange.com/questions/182032/zip-the-contents-of-a-folder-without-including-the-folder-itself