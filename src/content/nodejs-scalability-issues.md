---
layout: post
title: "3 node.js enterprise scalability issues and how to solve them 🗼"
author: santypk4
date: "2019-03-22T08:00:00.000Z"
image: img/node-scalability.jpg
subtitle: "Serving static assets, enabling clustering, and using poorly designed cron jobs, are the most common takeaways from scaling a node.js server. \n
Here is how you can fix them"
tags: ["Node.js", "Best"]
twittertags: ["node", "scalability", "backend", "programming", "DevOps", "javascript"]
draft: false
---

# How to scale node.js applications? 🤔

  Scaling a node.js application is not about the routing framework (express, koa, fastify), sure, having the one with the highest throughput help, but it's all about your architecture.

  A node.js backend for a real-time chat application can handle a different load that an e-commerce app.
  Netflix uses node.js for its microservices infrastructure, they have a video streaming platform that needs to serve a million concurrent connections.
  But they don't have just a single node.js app running in a big machine, they have a microservice architecture.

  Here are some considerations and common issues that many development teams face at the moment of scaling a node.js application.

# Table of contents 📝

 - [Serving static assets with express](#assets)
 - [Jobs and Workers](#jobs)
 - [Using all the resources](#resources)
 - [Conclusion](#conclusion)

  I worked for a couple of startups who started their software products just from a simple express.js template that we found on GitHub.

  At Whyline for example, back in 2015, I was who installed the ["Angular Full-Stack"](https://github.com/angular-fullstack/generator-angular-fullstack) template from Yeoman (Oh boy I'm old).

  The product grows fast, and in the process, we had to almost re-write the backend server, change the semi-monolithic architecture to a microservices based one, move away from the web-client from being served on the node.js app to be hosted on AWS S3 and have a CDN.

  And we did so many other things in order to scale the node.js applications like performance improvements in Linux AMIs, refactors to several layers, implementing typescript in the node.js server, re-writing some node.js services, implementing pub-sub pattern in a node.js microservice, implementing sockets with socket.io, move away the search solution from node.js to Elastic Search, add Redis cache layers, and so.

  _It will take me a whole year to write about all_

  Now, I'm working as a freelancer consultor, and every new project that I arrived has this same scalability issues.
  So today I want to talk about how they are holding back your node.js server from growing and reaching a high scalability state.

<a name="assets"></a>

# Serving static assets 📦

  Why do you have your angular or react app served by express.js in your node.js server?

  **Node.js wasn't designed to serve static assets, it takes so many cpu% time.**

  You should be using a proxy CDN like CloudFront in front of your static files.

  I believe the root of the problem comes from the number of starter templates that comes with a "full-stack" solution for building an MVP.
  But when your product and user base grows, you will face a problem, your node.js server will use too many CPU time.

  ![node.js and Web client architecture](/img/nodejs-scalability/static_assets.png)

  [Check this article on how to implement AWS S3 + AWS Cloudfront for doing this task.](/s3-cloudfront-angular-react)

  Also, you can use Netlify which is [totally free for 100GB network](https://www.netlify.com/tos/) traffic monthly and 1TB traffic for paid accounts.

  As an example of how much is it, **this blog is hosted on Netlify** and each page weight almost 800kb, so I can have around **100.000 visits/month for free.**

  ## And please DON'T USE gzip compression

  I know, [it's in the express.js documentation](https://expressjs.com/en/advanced/best-practice-performance.html), it should be a good thing right? 

  Well, no, compressing a response involves CPU computation.

  So it's better to delegate that kind of tasks to the proxy, CloudFront has the option to set compression, as well as other proxies like Nginx.

<a name="jobs"></a>

  # A good task scheduler ⏰

  It's very common the needing of a recurring task, maybe you need to fire a reminder for a user once a day, or calculating the billing of the service for a customer once a month.

  **But you shouldn't rely on simple `setTimeout` or `setInterval` for doing such tasks.**

  Bad planning here will bring you troubles when you will try to scale horizontally your node.js server, the cron jobs will be duplicated and chaos can occur.

  It's a better approach to use a task scheduler framework like [agendajs](https://github.com/agenda/agenda) who has a separate [module to have an admin dashboard.](https://github.com/agenda/agendash)

  - Scheduled and recurring Jobs are stored in MongoDB, every time a worker start a job, they lock the execution so no problem with multiple jobs running at the same time.

  - Can reschedule jobs easily, they are just MongoDB documents that can be changed at any time.

  - If the task fails you can reschedule to run again.

  - You can add an admin dashboard GUI to monitoring scheduled and recurring task and their states.

  - Using the admin dashboard you can run manually a job whenever you want.

  - No problem with horizontal scaling of node.js server and duplication of job execution.


### Setting up agendajs
We setup agendajs following the best practices to create index and 
```javascript
import * as agendajs from 'agenda';
import { Collection } from 'mongoose';

export default ({ mongoConnection, logger }) => {
  const agendajs = (new agendajs() as any);

  (async () => {
    await agendajs._ready;

    try {
      (agendajs._collection as Collection).ensureIndex({
        disabled: 1,
        lockedAt: 1,
        name: 1,
        nextRunAt: 1,
        priority: -1
      }, {
          name: 'findAndLockNextJobIndex'
        });
    } catch (err) {
      logger.warn('Failed to create agendajs index!');
      logger.warn(err);
      throw err;
    }

    logger.info('agendajs index ensured');
  })();

  agendajs
    .mongo(mongoConnection, 'my-agendajs-jobs')
    .processEvery('5 seconds')
    .maxConcurrency(20);

  return agendajs;
}

```

### Setting up agendajs jobs

```javascript
import { Container } from 'typedi';
import MailerService from '../services/companies';

export default class SendWelcomeEmail {

  public async handler (job, done): Promise<any> {
    const { email } = job.attrs.data;
    const mailerServiceInstance = Container.get(MailerService);
    await mailerServiceInstance.SendWelcomeEmail(email);
    done();
  }
}


```

### Registering the agendajs job

We defined what's gonna be the handler of the job `send-welcome-email`

```javascript
import SendWelcomeEmail from '../jobs/send-welcome-email';

export default ({ agendajs }) => {

  agendajs.define('send-welcome-email', 
    { priority: 'high', concurrency: 10 },
    new SendWelcomeEmail().handler, // reference to the handler, but not executing it! 
  )
  
  agendajs.start();
}
```

### Job definition
Were the logic for the
```javascript

import * as mailgun from 'mailgun';

export default class Mailer {
  constructor(
  ) {
  }

  public async SendWelcomeEmail(email){
    const data = {
      from: 'Hi from Softwareontheroad <santiago@softwareontheroad.com>',
      to: email,
      subject: 'Welcome !',
      text: 'Thanks for sign up',
    };

    return mailgun.messages().send(data);
  }

}

```

### Calling agendajs jobs

  ```javascript

  import { Service, Inject } from 'typedi';

  @Service()
  export default class UsersService {
    constructor(
      @Inject('agendajsClient') private agendajs;
    ) {
    }

    public async SignUp(userDTO: IUserDTO): Promise<IUser> {
      let user;
      try {
        user = new UserModel(userDTO);
        ... // do fancy stuff
        await user.save();
        
        // Call to agendajs and schedule a task, in 10 minutes send the welcome email to the user.
        this.agendajs.schedule('in 10 minutes', 'send-welcome-email', { email: user.email },);

        ... // do more fancy stuff
        return user;
      } catch(e) {
        logger.warn('Error on creation of user...')
        await user.remove();
        throw e;
      }
    }
  }
  ```

  ### Setting up agendash for GUI admin dashboard.

  ```javascript
import * as basicAuth from 'express-basic-auth';
import * as agendash from 'agendash';

export default ({ expressApp, agendajsInstance }: { expressApp: Application }) => {
  expressApp.use('/agendash',
    basicAuth({
      users: {
        agendajsAdmin: 'super-secure-and-secred-password',
      },
      challenge: true,
    }),
    agendash(agendajsInstance)
  );
};

```

CAPTURA DE PANTALLA DE AGENDASH

<a name="resources"></a>

# Using all the resources 💰

  ![node.js clustering overview](/img/nodejs-scalability/clustering.png)

  Is the year 2019 and still most developers don't use the cluster feature that comes built-in in node.js since version 0.12.0

  By default it works like this: **the master process listens on a port**, accepts new connections and **distributes them across the workers in a round-robin fashion**, with some built-in smarts to avoid overloading a worker process.

  Check this comparasions:

  - Reponse time _lower is better_
  ![node.js cluster performance graph](/img/nodejs-scalability/cluster_mode.png)

  - Concurrent connections _higher is better_
  ![node.js cluster performance table](/img/nodejs-scalability/cluster_mode_2.png)

## Cluster mode implementation

  Implementation is pretty straight forward if you have your node.js project correctly structured.

  Go to your project entry point, require cluster mode, and spawn your application when the process is a worker.
  
  ![Project structure](/img/nodejs-scalability/folder_structure.png)

  _Check out my guide on a good project structure for node.js servers._

  _File: app.js_
  ```javascript
  const express = require('express');

  module.exports = () => {
    const app = express();
    // Just a basic route
    app.get('/', function (req, res) {
      res.send('Hello World!');
    });
    app.listen(4000);
    console.log('Application running!');
  }
  ```

  We are setting up our server, nothing new or fancy here.

  _File: index.js_
  ```javascript
  const cluster = require('cluster');
  const os = require('os');
  const runExpressServer = require('./app');

  // Check if current process is master.
  if (cluster.isMaster) {
    // Get total CPU cores.
    const cpuCount = os.cpus().length;

    // Spawn a worker for every core.
    for (let j = 0; j < cpuCount; j++) {
      cluster.fork();
    }
  } else {
    // This is not the master process, so we spawn the express server.
    runExpressServer();
  }

  // Cluster API has a variety of events.
  // Here we are creating a new process if a worker die.
  cluster.on('exit', function (worker) {
    console.log(`Worker ${worker.id} died'`);
    console.log(`Staring a new one...`);
    cluster.fork();
  });

  ```

  First, we are requiring the `cluster` module. Then we check if the current process is master.

  If so, we get the total amount of CPU cores and spawn worker processes.

  Otherwise, the current process is a worker, so we initialize our app here.

  Also, we are setting up a subscriber for the event 'exit'. If a worker dies for any reason, we spawn a new one in replacement.

  It may seem scary to try this out in your already in production node.js server, but you don't have to worry.
  Unless you are using some type of home-made CRON in the same server that runs your API.

  [And we already talk about this, in the previous section.](/#jobs)

# Know when to go serverless and when not

  Nowadays with all the advance of frameworks like AWS Serverless is just easier to start your node.js directly in lambda functions.

  But it may slow you down, especially if you are in early stages of your company, creating a Pipeline of continuous integration, continuous delivery, testing and several environments (staging, dev, production) can take a significative amount of time, much more than the classic node.js on a Heroku instance right to go.

  Although, if you have your server already running in production, your customers are happy, and you plan to develop a new feature, you should consider if it can be done in a couple of Lambda Functions.

  Which bring me to the next issue

# Split your monolithic app into microservices early on

  Don't let your node.js server codebase grow without proper separation of concerns, because a microservice architecture is just that, a fancy separation of concerns applied to infrastructure.

  But how do you know when and how to split?

  You have to follow a basic principle

  New feature -> Requires or Adds functionality to existing features ? do it on your existing app : is a medium-big feature ? separate : do it on your existing app

  For example, when your codebase start to grow 

<a name="conclusion"></a>

# Conclusion

  I guaranty you that you will be able to handle more traffic if you follow these considerations.

  Serving static assets with node.js is a task that demands a lot of CPU, node.js wasn't designed for that.

  Having your cron jobs inside agendajs will benefice you at the moment of doing horizontal scalability.

  And don't forget to enable the power of cluster mode from day 1 to make use of all the resources available in the machine.

  My experience has tough me that once you scale your node.js server, _maybe by throwing all away and move to AWS Lambda_, the next big challenge is scaling the database behind.

  And that's something that we'll discuss in a future post.

### Let me know in a comment, what was your biggest challenge scaling a node.js application?

# Resources
  - https://nodejs.org/api/cluster.html
  - https://github.com/agenda/agenda
  - https://github.com/agenda/agendash/issues/98