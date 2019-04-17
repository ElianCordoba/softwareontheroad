---
layout: post
title: "Bulletproof node.js project architecture"
author: santypk4
date: "2019-04-16T08:00:00.000Z"
image: img/node-project-structure.jpeg
subtitle: "A simple yet powerful project architecture for node.js REST APIs"
tags: ["Node.js"]
twittertags: ["node", "javascript", "100daysofcode", "programming", "devops"]
draft: false
---

# Introduction

  While Express.js is great frameworks for making a node.js REST APIs it doesn't offer you any clue for organizing your node.js project.

  And it may sound silly but this is a real problem, the correct organization of your project will avoid duplication of code, improve stability and potentially will help you scale your services if is doing correctly.

  This is extense research from my years of experience dealing with poor structured node.js project and bad patterns, countless hours of refactoring code and moving things around.

  If you need help to align your node.js project architecture, just drop me a letter at santiago@softwareontheroad.com

# Table of contents

  - [The folder structure 🏢](#folder)
  - [3 Layer architecture 🥪](#architecture)
  - [Service Layer 💼](#service)
  - [Pub/Sub Layer ️️️️🎙️️](#pubsub)
  - [Dependency Injection 💉](#di)
  - [Unit Testing 🕵🏻](#test)
  - [Cron Jobs and recurring task ⚡](#cron)
  - [Configurations and secrets 🤫](#configs)
  - [Loaders 🏗️](#loaders)

<a name="folder"></a>

# The folder structure 🏢

  Here you have the project structure that I use, in every node.js REST API Service that I built.

  ```md
  src
  │   app.js          # App entry point
  └───api             # Express route controllers for all the endpoints of the app
  └───config          # Environment variables and configuration related stuff
  └───jobs            # Jobs definitions for agenda.js
  └───loaders         # Split the startup process into modules
  └───models          # Database models
  └───services        # All the business logic is here
  └───subscribers     # Event handlers for async task
  └───types           # Type declaration files (d.ts) for Typescript
  ```

  But it's more than just a way of ordering your files...

<a name="architecture"></a>

# 3 Layer architecture 🥪

  The idea is to use the **principle of separation of concerns** to move away from the business logic from the API Routes.

  ![3 layer pattern](/img/nodejs-project-structure/server_layers.png)

  Someday, you will want to use your business logic on a CLI tool, or not going far, in a recurring task, and make an API call from the node.js server to itself it's not a good idea...

  ![3 layer pattern for node.js REST API](/img/nodejs-project-structure/server_layers_2.png)

## ☠️ Don't put your business logic inside the controllers!! ☠️

  You may be tempted to just use the controllers to store the business logic of your application, but this quickly becomes spaghetti code, as soon as you need to write unit tests, you will end up dealing with complex mocks for req or res express objects.

  Also, it's complicated to separate when a response should be sent and when a process should be run in 'background' after the response is sent to the client.

  Here is an example of what not to do.
  ```javascript
  route.post('/', async (req, res, next) => {

    // This should be a middleware or should be handled by a library like Joi.
    const userDTO = req.body;
    const isUserValid = validators.user(userDTO)
    if(!isUserValid) {
      return res.status(400).end();
    }

    // Lot of business logic here...
    const userRecord = await UserModel.create(userDTO);
    delete userRecord.password;
    delete userRecord.salt;
    const companyRecord = await CompanyModel.create(userRecord);
    const companyDashboard = await CompanyDashboard.create(userRecord, companyRecord);

    ...whatever...


    // And here is the 'optimization' that mess up everything.
    // The response is sent to client...
    res.json({ user: userRecord, company: companyRecord });

    // But code execution continues :(
    const salaryRecord = await SalaryModel.create(user, salary);
    eventTracker.track('user_signup',userRecord,companyRecord,salaryRecord);
    intercom.createUser(userRecord);
    gaAnalytics.event('user_signup',userRecord);
    await EmailService.startSignupSequence(userRecord)
  });

  ```

  <a name="service"></a>

  # Use a service layer for your business logic 💼

  This layer is where your business logic should live.

  It's just a collection of classes with clear porpuses following the SOLID principles.

  In this layer there should not exists any form of 'SQL query', use the data access layer for that.

  - Move your code away from the express.js router
  - Don't pass the req or res object to the service layer
  - Don't return anything related to the HTTP transport layer like a status code or headers from the service layer.

  Example

  ```javascript
  route.post('/', 
    validators.userSignup, // this middleware take care of validation
    async (req, res, next) => {
      // The actual responsability of the route layer.
      const userDTO = req.body;

      // Call to service layer.
      // Abstraction on how to access the data layer and the business logic.
      const { user, company } = await UserService.Signup(userDTO);

      // Return a response to client.
      return res.json({ user, company });
    });
  ```

  Your service working behind the scenes

  ```javascript
  import UserModel from '../models/user';
  import CompanyModel from '../models/company';

  export default class UserService() {

    async Signup(user) {
      const userRecord = await UserModel.create(user);
      const companyRecord = await CompanyModel.create(user);
      const salaryRecord = await SalaryModel.create(user, salary);
      
      ...whatever
      
      await EmailService.startSignupSequence(userRecord)

      ...do more stuff

      return { user: userRecord, company: companyRecord };
    }
  }

  ```

<a name="pubsub"></a>

# Use a Pub/Sub layer too 🎙️

  This goes beyond the classic node.js 3 layer architecture proposed here but it's extremely useful.

  Your simple API call that creates a user may want to call third-party services, maybe to an analytics service, or maybe start an email sequence. 

  Sooner than later, your simple "create" operation will be doing several things and will be 1000 lines of code all in a single function, that violates the principle of single responsibility.

  It's better to separate responsibilities so the code is more maintainable.
  But an imperative call to a dependent service is not the best way of doing it nether, it will be too much code.

  ```javascript
  import UserModel from '../models/user';
  import CompanyModel from '../models/company';
  import SalaryModel from '../models/salary';

  export default class UserService() {

    async Signup(user) {
      const userRecord = await UserModel.create(user);
      const companyRecord = await CompanyModel.create(user);
      const salaryRecord = await SalaryModel.create(user, salary);

      eventTracker.track(
        'user_signup',
        userRecord,
        companyRecord,
        salaryRecord
      );

      intercom.createUser(
        userRecord
      );

      gaAnalytics.event(
        'user_signup',
        userRecord
      );
      
      await EmailService.startSignupSequence(userRecord)

      ...more stuff

      return { user: userRecord, company: companyRecord };
    }

  }
  ```

  A better approach is just to emit an event, 'a user signed up with this email'. And you are done, now it's the responsibility of the listeners to do their job.

  ```javascript
  import UserModel from '../models/user';
  import CompanyModel from '../models/company';
  import SalaryModel from '../models/salary';

  export default class UserService() {

    async Signup(user) {
      const userRecord = await this.userModel.create(user);
      const companyRecord = await this.companyModel.create(user);
      this.eventEmitter.emit('user_signup', { user: userRecord, company: companyRecord })
      return userRecord
    }

  }
  ```

  And now you can split the event handlers into multiple files

  ```javascript
  eventEmitter.on('user_signup', ({ user, company }) => {

    eventTracker.track(
      'user_signup',
      user,
      company,
    );

    intercom.createUser(
      user
    );

    gaAnalytics.event(
      'user_signup',
      user
    );
  })
  ```

  ```javascript
  eventEmitter.on('user_signup', ({ user, company }) => {
    const salaryRecord = await SalaryModel.create(user, salary);
  })
  ```

  ```javascript
  eventEmitter.on('user_signup', ({ user, company }) => {
    await EmailService.startSignupSequence(user)
  })
  ```

<a name="di"></a>

# Dependency Injection 💉

  D.I. or inversion of control (IoC) is a common pattern that helps you organize by 'injecting' or passing through the constructor the _dependencies_ of your class.

  By doing this way you will gain the flexibility to inject a _'compatible dependency'_ when, for example, you write the unit tests for the service, or when the service is used in another context.

  Code with no D.I

  ```javascript
  import UserModel from '../models/user';
  import CompanyModel from '../models/company';
  import SalaryModel from '../models/salary';  
  class UserService {
    constructor(){}
    Sigup(){
      // Caling UserMode, CompanyModel, etc
      ...
    }
  }
  ```

  Code with manual dependency injection

  ```javascript
  export default class UserService {
    constructor(userModel, companyModel, salaryModel){
      this.userModel = userModel;
      this.companyModel = companyModel;
      this.salaryModel = salaryModel;
    }
    getMyUser(userId){
      // models available throug 'this'
      const user = this.userModel.findById(userId);
      return user;
    }
  }
  ```
  Now you can inject custom dependencies.
  ```javascript
  import UserService from '../services/user';
  import UserModel from '../models/user';
  import CompanyModel from '../models/company';
  const salaryModelMock = {
    calculateNetSalary(){
      return 42;
    }
  }
  const userServiceInstance = new UserService(userModel, companyModel, salaryModelMock);
  const user = await userServiceInstance.getMyUser('12346');
  ```

  The amount of dependencies that a service can have is infinite, and refactor every instantiation for service in all the codebase
  every time you add a new one is boring.

  That's why dependency injection frameworks where created.

  The idea is you declare your dependencies in the class, and when you need an instance of that class, you just call the 'Service Locator'.
  Let's see an example using [typedi](https://www.npmjs.com/package/typedi)

  [You can read more on how to use typedi in the official documentation](https://www.github.com/typestack/typedi)

  _WARNING typescript example_
  ```typescript
  import { Service } from 'typedi';
  @Service()
  export default class UserService {
    constructor(
      private userModel,
      private companyModel, 
      private salaryModel
    ){}

    getMyUser(userId){
      const user = this.userModel.findById(userId);
      return user;
    }
  }
  ```
  _services/user.ts_

  Now typedi will take care of resolve any dependency the UserService require.
  
  ```javascript
  import { Container } from 'typedi';
  import UserService from '../services/user';
  const userServiceInstance = Container.get(UserService);
  const user = await userServiceInstance.getMyUser('12346');
  ```
  *_Abusing service locator calls is an anti-pattern_*

## Using Dependency Injection with Express.js in Node.js

  The final piece of the puzzle.

  **Routing layer**
  ```javascript
  route.post('/', 
    async (req, res, next) => {
      const userDTO = req.body;

      const userServiceInstance = Container.get(UserService) // Service locator

      const { user, company } = userServiceInstance.Signup(userDTO);

      return res.json({ user, company });
    });
  ```

  Now the node.js project looks great, it so organized that makes me want to be coding something right now.

  <a name="test"></a>

# An unit test example 🕵🏻

  Using dependency injection and these organization patterns, testing becomes really simple.

  You don't have to mock req/res objects and you don't have to mock require(...) calls.

  The unit test for signup user method

  _tests/unit/services/user.js_
  ```javascript
  import UserService from '../../../src/services/user';

  describe('User service unit tests', () => {
    describe('Signup', () => {
      test('Should create user record and emit user_signup event', async () => {
        const eventEmitterService = {
          emit: jest.fn(),
        };

        const userModel = {
          create: (user) => {
            return {
              ...user,
              _id: 'mock-user-id'
            }
          },
        };

        const companyModel = {
          create: (user) => {
            return {
              owner: user._id,
              companyTaxId: '12345',
            }
          },
        };

        const userInput= {
          fullname: 'User Unit Test',
          email: 'test@example.com',
        };

        const userService = new UserService(userModel, companyModel, eventEmitterService);
        const userRecord = await userService.SignUp(teamId.toHexString(), userInput);

        expect(userRecord).toBeDefined();
        expect(userRecord._id).toBeDefined();
        expect(eventEmitterService.emit).toBeCalled();
      });
    })
  })

  ```
<a name="cron"></a>

# Cron Jobs and recurring task ⚡

  Now that you abstracted your business logic into the service layer, you may have a recurring task or a Cron that needs to be executed.

  You should never rely on node.js `setTimeout` or another primitive way of delay the execution of code, but on a framework that persist your jobs, and the execution of them, in a database.

  This way you will have control over the failed jobs, and feedback of those who succeed.
  I already wrote on good practice for this so, [check my guide on using agenda.js the best task manager for node.js](/nodejs-scalability-issues).

<a name="configs"></a>

# Configurations and secrets 🤫

  Following the battle-tested concepts of [Twelve-Factor App](https://12factor.net) in node.js the best approach to store API Keys and database string connections, it's with **dotenv**.

  By using a `.env` file, that you must never commit (but it has to exist with default values in your repository) the npm package `dotenv` loads the .env file and put the vars into `process.env`

  This may be good enough but, we add an extra step, have a `config/index.ts` file where you call `dotenv` and load the .env file and also use a config object, with the proper structure.

  _config/index.js_
  ```javascript
  const dotenv = require('dotenv');
  // config() will read your .env file, parse the contents, assign it to process.env.
  dotenv.config();
  
  export default {
    port: process.env.PORT,
    databaseURL: process.env.DATABASE_URI,
    paypal: {
      publicKey: process.env.PAYPAL_PUBLIC_KEY,
      secretKey: process.env.PAYPAL_SECRET_KEY,
    },
    paypal: {
      publicKey: process.env.PAYPAL_PUBLIC_KEY,
      secretKey: process.env.PAYPAL_SECRET_KEY,
    },
    mailchimp: {
      apiKey: process.env.MAILCHIMP_API_KEY,
      sender: process.env.MAILCHIMP_SENDER,
    }
  }
  ```

  Doing this way you avoid flooding your code with `process.env.MY_RANDOM_VAR` instructions, and by having the autocompletion you don't have to know how to name the env var.

<a name="loaders"></a>

# Loaders 🏗️

  I took this pattern from [W3Tech microframework](https://www.npmjs.com/package/microframework-w3tec) but without depending upon their package.

  The idea is that you split the startup process of your service into testable modules.

  Let's see a classic express.js app initialization

  ```javascript
  const mongoose = require('mongoose');
  const express = require('express');
  const bodyParser = require('body-parser');
  const session = require('express-session');
  const cors = require('cors');
  const errorhandler = require('errorhandler');
  const app = express();

  app.get('/status', (req, res) => { res.status(200).end(); });
  app.head('/status', (req, res) => { res.status(200).end(); });
  app.use(cors());
  app.use(require('morgan')('dev'));
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json(setupForStripeWebhooks));
  app.use(require('method-override')());
  app.use(express.static(__dirname + '/public'));
  app.use(session({ secret: process.env.SECRET, cookie: { maxAge: 60000 }, resave: false, saveUninitialized: false }));
  mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });

  require('./config/passport');
  require('./models/user');
  require('./models/company');
  app.use(require('./routes'));
  app.use((req, res, next) => {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });
  app.use((err, req, res) => {
    res.status(err.status || 500);
    res.json({'errors': {
      message: err.message,
      error: {}
    }});
  });


  ... more stuff 

  ... maybe start up Redis

  ... maybe add more middlewares

  async function startServer() {    
    app.listen(process.env.PORT, err => {
      if (err) {
        console.log(err);
        return;
      }
      console.log(`Your server is ready !`);
    });
  }

  // Run the async function to start our server
  startServer();
  ```
  As you see, this part of your application can be a real mess.

  Here is an effective way to deal with it.
  ```javascript
  const loaders = require('./loaders');
  const express = require('express');

  async function startServer() {

    const app = express();

    await loaders.init({ expressApp: app });

    app.listen(process.env.PORT, err => {
      if (err) {
        console.log(err);
        return;
      }
      console.log(`Your server is ready !`);
    });
  }

  startServer();
```

  Now the loaders are just tiny files with a concise purpose 

  _loaders/index.js_
  ```javascript
  import expressLoader from './express';
  import mongooseLoader from './mongoose';

  export default async ({ expressApp }) => {
    const mongoConnection = await mongooseLoader();
    console.log('MongoDB Intialized');
    await expressLoader({ app: expressApp });
    console.log('Express Intialized');

    // ... more loaders can be here

    // ... Initialize agenda
    // ... or Redis, or whatever you want
  }
  ```

  The express loader

  _loaders/express.js_
  ```javascript

  import * as express from 'express';
  import * as bodyParser from 'body-parser';
  import * as cors from 'cors';

  export default async ({ app }: { app: express.Application }) => {

    app.get('/status', (req, res) => { res.status(200).end(); });
    app.head('/status', (req, res) => { res.status(200).end(); });
    app.enable('trust proxy');

    app.use(cors());
    app.use(require('morgan')('dev'));
    app.use(bodyParser.urlencoded({ extended: false }));

    // ...More middlewares

    // Return the express app
    return app;
  })

  ```

  The mongo loader

  _loaders/mongoose.js_
  ```javascript
  import * as mongoose from 'mongoose'
  export default async (): Promise<any> => {
    const connection = await mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
    return connection.connection.db;
  }
  ```

<a name="conclusion"></a>

# Conclusion

  We explore a production tested project structure that can be summarised in these tips: 

  - Use a 3 layer architecture.

  - Don't put your business logic on the controllers.

  - Use PubSub pattern and emit events for background tasks.

  - Have dependency injection for your peace of mind.

  - Never leak your passwords, secrets and API keys, use a configuration manager.

  - Split your node.js server configurations into small modules that can be loaded independently