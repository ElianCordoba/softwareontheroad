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

  While Express.js or Hapi.js are great frameworks for making a node.js rest API they don't offer you a clear way of architecture your node.js project.

  Due to the massive amount of node.js tutorials for beginners, the vast majority of node.js projects that are [#.......]

  If you need help to align your node.js project architecture, just drop me a letter. (CALL TO ACTION)

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

# 3 Layer architecture 🥪

  The idea is to use the **principle of separation of concerns** to move away from the business logic from the API Routes.

  ![3 layer pattern](/img/nodejs-project-structure/server_layers.png)

  Someday, you will want to use your business logic on a CLI tool, or not going far, in a recurring task, and make an API call from the node.js server to itself it's not a good idea...

  ![3 layer pattern for node.js REST API](/img/nodejs-project-structure/server_layers_2.png)

# Use a Pub/Sub layer too 🎙️

  This goes beyond the classic node.js 3 layer architecture proposed here but it's extremely useful.

  Your simple API call that creates a user may want to call third-party services, maybe to an analytics service, or maybe start an email sequence. 

  Sooner than later, your simple "create" operation will be doing several things, and will be 1000 lines of code all in a single function, that violates the principle of single responsibility.

  It's better to separate responsabilities so code is more maintenible.
  But an imperative call to a dependent service, is not the best way of doing it nether, it will be too much code.

  ->>> EXAMPLE OF CHAIN OF CALLS <<<-


  A better approach is just to emit an event, 'a user signed up with this email'. And you are done, now it's the responsibility of the listeners to do their job.

  ->>> EXAMPLE OF PUB/SUB <<<-

# Dependency Injection 💉

  When several services are connected and depended upon each other, it's a good practice to use a dependency injection pattern, and not just 'require' the siblings' service in the file.

  By doing this way, you will gain flexibility when writing unit tests.
  The 


# Cron Jobs ⚡

  You should never rely on node.js `setTimeout` or another primitive way of delay the execution of code, but on a framework that persist your jobs, and the execution of them, in a database.

  This way you will have control over the failed jobs, and feedback of those who succeed.
  
  [Check my guide on using agenda.js for this crucial task.](/nodejs-scalability-issues)

# Configurations and secrets 🤫

  Following the bulletproof concepts of [Twelve-Factor App](https://12factor.net) in node.js the best approach to store API Keys and database string connections, it's with **dotenv**.

  By using a `.env` file, that you must never commit (but it has to exist with default values in your repository) the npm package `dotenv` loads the .env file and put the vars into `process.env`

  This may be good enought but, we add an extra step, have a `config/index.ts` file where you call `dotenv` and load the .env file and also use a config object, with the proper structure.

  ->>>> LOAD CONFIG FILES <<<<-

  Doing this way you avoid flooding your code with `process.env.MY_RANDOM_VAR` instructions, and by having the autocompletion you don't have to know how to name the env var.


# Loaders 🏹

  I took this pattern from [W3Tech microframework](https://www.npmjs.com/package/microframework-w3tec) but without depending upon their package.

  The idea is that you split the startup process of your service into testable modules.

  You shouldn't be mixing your database initialization with the express.js route setup or your cron service.
  And they may depend upon each other, this is an effective way of managing their relationship.

  With this approach, you gain flexibility and tidy a little how the modules are initialized.

# Don't put your business logic in the controllers!! Use the service layer

  You may be tempted to just use the controllers to store the business logic of your application, but this quickly becomes spaghetti code, as soon as you need to write unit tests, they end up dealing with complex mocks for req or res express objects.

  Also, it's complicated to separate when a response should be sent and when a process should be run in 'background' after the response is sent to the client.

# Unit testing - What a test looks like? 🕵🏻

  Testing becomes realy simple, you don't have to mock req/res objects and you don't have to mock require(...) calls

# Conclusion

  We explore a production tested project structure that can be summarised in these tips: 

  - Use a 3 layer architecture.

  - Don't put your business logic on the controllers.

  - Use PubSub pattern and emit events for background tasks.

  - Have dependency injection for your peace of mind.

  - Never leak your passwords, secrets and API keys, use a configuration manager.

# Resources

