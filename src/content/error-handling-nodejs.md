---
layout: post
title: "Error handling - The missing piece of your node.js architecture"
author: santypk4
date: "2019-06-12T14:00:00.000Z"
image: img/3-things-before-production-nodejs.jpg
subtitle: "How do you handle errors? And what about the server logs?"
tags: ["Node.js"]
twittertags: ["node", "javascript", "100daysofcode", "code", "webdev"]
draft: false
---
# Introduction

  Going to production will change your development workflow, add stress to your life, and take away development time for maintaining tasks. It's like having a baby.

  But I don't want to discourage you about going live, your boss will hate me, instead, I want to provide you a few tips that I learn through these years of <s> pain </s> experience going to production.

  I hope you find this post useful, if you think that I stole your time, please, send me a tweet at <a rel="nofollow noreferrer" href="https://twitter.com/santypk4"> @santypk4</a> with your feelings.

# Table of contents
  - [Error handling 🚧](#errors)
  - [The importance of logs 📝](#logs)
  - [Conclusion 🏗️](#conclusion)
  - [Example repository 🔬](https://github.com/santiq/nodejs-auth)


<a name="errors"></a>

# Error handling in Node.js 🚧

  ![user report](/img/3-things-before-production-nodejs/logs.jpg)

  When was the last time that a final user reports you a bug? 

  Maybe when the error was fatal and _he_ needed to use your system to continue working.

  But most of the time errors occur, and we the developers behind never notice it.

  The users generally don't want to report a bug, it involves filling ugly forms, giving too many details, and usually they never get an answer.

  The last time this happened to me, I was trying this new SaaS product that automatically brings me content related to my niche, to post on Twitter, all based in a state-of-the-art AI. 

  I was instantly bought by the landing page

  Well, to my luck, the app was entirely broke, the signup form never completes the request because some specific field was bad validated. 
  
  So I contacted the developers by twitter, but they never respond to me. 

  Until the last day of the month, when they wanted to charge me for a subscription to their SaaS that never worked.

  _I'm still interested in a service like this_

  Don't be like those guys and log your errors before the user notice it.

  ## You must have a stable, reliable, centralized way to handle your errors.**


  Using a real-world example of the 3-layer architecture from [the previous article](/ideal-nodejs-project-structure), let's imagine that your user search engine starts to fail.


  ![layers](/img/3-things-before-production-nodejs/layers.jpg)

  The important here is not to handle the errors from the underlying layers but to throw it to the controller layer.

  ```js
  import UsefulError from '../utils/usefulError';
  class UserService {
    constructor(
      private userSearchEngineService,
      private userThirdpartyService,
      private userDatabaseModel,
      private logger,
    )


    GetAll() {
      try {
        return this.userDatabaseModel.find();
      } catch(e) {
        throw new Error(`The database is dead!`, 503) 
      }
    }

    SearchUserByLocation(lat, long) {
      try {
        this.logger.silly('performing search...')
        return this.userSearchEngineService.searchByLocation(lat, long);
      } catch(e) {
        throw new Error(`The user search engine doesn't work!`, 503) 
      }
    }

    // Not related to something that happened to me 
    GetUsersFromThatThirdPartyServiceThatTheFounderMadeUsAssociateAndNeverWorkAndSeemLikeOurFault() {
      try {
        return this.userThirdpartyService.find();
      } catch(e) {
        this.logger.silly('We should call Pablo')
        throw new Error(`The thirdparty api doesnt work!`, 500) 
      }
    }
  }
  ```

  Let's create a custom class error, so we can add it more properties.

  ```js
  class UsefulError extends Error {
    constructor(name, httpStatusCode = 500, context, ...params) {
      // Pass remaining arguments (including vendor specific ones) to parent constructor
      super(...params);

      // Maintains proper stack trace for where our error was thrown (only available on V8)
      if (Error.captureStackTrace) {
        Error.captureStackTrace(this, UsefulError );
      }

      this.name = 'name';
      this.httpStatusCode = httpStatusCode;
      this.context = context; 
      this.date = new Date();
    }
  }

  ```

  Don't obfuscate your errors, be honest, let your users know why the request fail, so they can perform another action, or try something different.

  A good error message will be like: 

  > The user search engine doesn't work for now but you can still view your profile.


  ```javascript
  import Logger from '../logger';
  import UserService from '../services/user';

  export default (app) => {
    app.get('/user/search-location', (req, res, next) => {
      try {
        const { lat, lng } = req.query;
        Logger.silly('Invoking user service to search by location')
        const users = UserService.SearchUserByLocation(lat, lng);
        return res.json(users).status(200);
      } catch(e) {
        Logger.warn('We fail!')
        return next(e);
      }
    })
  }
  ```

  The controller layer just passes it to the next express middleware, our centralized error handler.

  ```javascript
  import Logger from '../logger';
  export default (err, req, res, next) => {
    Logger.error('Error %o', err);
    return res.json(err).status(err.httpStatusCode || 500);
  }
  ```


  Which bring me to...

<a name="logs"></a>

# The importance of logs 📝

  ### Have you ever have a server that you filled with console.logs for _everything_?

  ✋ I have been there.

  ### But then, have you ever have a server that doesn't log _anything_?

  ✋ I have been there too, and it was worst than logging everything.

  What I do now is a mix between both approaches.

  I log EVERYTHING **but** not everything is printed in the output log 😉

  I strongly believe that you need to log when an action is about to be performed when the action has been performed, the result and the error if happened.

  ![log calls](/img/3-things-before-production-nodejs/log-calls.jpg)

  Altough, those logs have different levels.

  ![log layers](/img/3-things-before-production-nodejs/log-layers.jpg)

  When your app is on production, and you need more information, just change the log level through an environment variable.

  ![log layers](/img/3-things-before-production-nodejs/log-config.jpg)

  You can see an example of a migration from console.log to winston in [this PR](https://github.com/santiq/bulletproof-nodejs/pull/11) to the bulleproof node.js project.


  The best thing, winston let you set the 'transport' layer, that would be where your errors show up.

  I made them appear in the console, but you can easily install a plugin that will report to Sentry or Rollbar or whatever is the best for you. 

  Blessed adapter pattern.

<a name="conclusion"></a>

# Conclusion 🏗️

  Use a logger library like Winston, and separate your **logs by level** instead of using console.log that flood the log files.

  Consider using a centralized error handling, can be a middleware for express, just forward your errors all to the same central location in your server.

  I hope you enjoyed this little post, and if you are interested in more node.js tips, and maybe a [Bullet Proof node.js project architecture](/ideal-nodejs-project-structure), I strongly recommend you to read that article.

### [See the example repository here 🔬](https://github.com/santiq/bulletproof-nodejs)


