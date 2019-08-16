---
layout: post
title: "Discovering the Best 10 Node.js Frameworks in 2019"
subtitle: "A comparasion of the 10 most downloaded node.js frameworks"
author: santypk4
date: "2019-07-30T13:00:00.000Z"
image: img/nodejs-frameworks.jpg
tags: ["Node", "Javascript", "Best"]
twittertags: ["100daysofcode", "codenewbie", "javascript", "webdev", "node"]
draft: false
---

I'm so tired of reading articles claiming what is the best node.js framework based on biased oppinions or sponsorhips _(yes, that's a thing)_

So here are the top node.js frameworks ranked by daily downloads, the data was taken from npmjs.com itself _(sorry yarn)_.

`youtube: P0Xk8UhawEQ`

# Table of content

- [What is a node.js framework?](#what-is-a-framework)
- [How to choose a node.js framework?](#choose-wisely)
- [Adonis.js (1,290 Daily Downloads)](#adonis)
- [Feathersjs.js (5,417 Daily Downloads)](#feathers)
- [Sails.js (5,540 Daily Downloads)](#sails)
- [Loopback.io (7,413 Daily Downloads)](#loopback)
- [Fastify.js (19,986 Daily Downloads)](#fastify)
- [Restify.js (23,836 Daily Downloads)](#restify)
- [Next.js (23,381 Daily Downloads)](#next)
- [Hapi.js (48,248 Daily Downloads)](#hapi)
- [Koa.js (61,147 Daily Downloads)](#koa)
- [Express.js (1,940,277 Daily Downloads)](#express)
- [Conclusion](#conclusion)

<a name="what-is-a-framework"></a>

# What is a node.js framework?

<a name="choose-wisely"></a>

# How to choose a node.js framework for my application ?


You have to consider mainly 2 things:

1. The scalability and resilance of the framework

2. If the development process is something you feel comfortable working with.

Regardless scalability and resilance, every node.js web framework is built on top of the `http` module.

Some of this frameworks add to much ... and that makes a huge impact on the server's throughtput.

In my opinion working with a barebone framework like Express.js or Fastify.js is the best when the service you are developing is small in business logic but need to be highly scalable.

By the other hand, if you are developing a medium size application, it's better to go with a framework that help you have a clear structure like next.js or loopback.

There is no simple answer to the question, you better have a peek on how to declare API routes on every framework on this list and decide for yourself.

<cta-container type="hire" copy="node" ></cta-container>

<a name="adonis"> </a>

# 10. Adonis

[_Adonis.js_](https://adonisjs.com/) is an MVC (Model-View-Controller) node.js framework capable of building an API Rest with JWT authentication and database access.

## What's is this framework about?

The good thing is that Adonis.js framework comes with a CLI to create the boostrap for applications.

```bash
$ npm i -g @adonisjs/cli
$ adonis new adonis-tasks
$ adonis serve --dev
```

The typical Adonis app has a MVC structure, that way you don’t waste time figuring out how you should structure your web server.

Some apps built with adonis can [be found here.](https://madewithadonisjs.com/)

<a name="feathers"> </a>

# 9. Feathers

[_Feather.js_](https://feathersjs.com/) is a node.js frameworks promise to be a REST and realtime API layer for modern applications.

## See what's capable of!!

This is all the code you need to setup your API REST + realtime websockets connection thanks to the socket.io plugin

```js
const feathers = require('@feathersjs/feathers');
const express = require('@feathersjs/express');
const socketio = require('@feathersjs/socketio');
 
const memory = require('feathers-memory');
 
// Creates an Express compatible Feathers application
const app = express(feathers());
 
// Parse HTTP JSON bodies
app.use(express.json());
// Parse URL-encoded params
app.use(express.urlencoded({ extended: true }));
// Add REST API support
app.configure(express.rest());
// Configure Socket.io real-time APIs
app.configure(socketio());
// Register a messages service with pagination
app.use('/messages', memory({
  paginate: {
    default: 10,
    max: 25
  }
}));
// Register a nicer error handler than the default Express one
app.use(express.errorHandler());
 
// Add any new real-time connection to the `everybody` channel
app.on('connection', connection => app.channel('everybody').join(connection));
// Publish all events to the `everybody` channel
app.publish(data => app.channel('everybody'));
 
// Start the server
app.listen(3030).on('listening', () =>
  console.log('Feathers server listening on localhost:3030')
);
```

Pretty sweet right?

Here are some apps [built with feathers.js.](https://github.com/feathersjs/awesome-feathersjs#projects-using-feathers)

<a name="sails"> </a>

# 8. Sails

_[Sails.js](https://sailsjs.com/) Ye' olde node.js framework_

With 7 years of maturity, this is a battle tested node.js web framework that you should definitivelly check out!

## See it in action

Sails cames with a CLI tool to help you get started in just 4 steps

```bash
$ npm install sails -g
$ sails new test-project
$ cd test-project
$ sails lift 
```


<a name="loopback"> </a>

# 7. Loopback

Backed by IBM, [Loopback.io](https://loopback.io) is an enterprsie grade node.js framework, used by companies such as GoDaddy, Symantec, IBM itself.

They even offer Long-Term Support (LTS)

## 

<a name="fastify"> </a>

# 6. Fastify

[Fastify.io](https://www.fastify.io) is a node.js framework that is designed to be the replacement of express.js [with a 65% better performance](https://www.fastify.io/benchmarks/).

## Show me the code

```js
// Require the framework and instantiate it
const fastify = require('fastify')({
  logger: true
})

// Declare a route
fastify.get('/', (request, reply) => {
  reply.send({ hello: 'world' })
})

// Run the server!
fastify.listen(3000, (err, address) => {
  if (err) throw err
  fastify.log.info(`server listening on ${address}`)
})
```
And that's it! 

I love the simplicity and reminicence to express.js of fastify, definitively is the framework to go if performance is an issue in your server.

<a name="restify"> </a>

# 5. Restify

[Restify](http://restify.com/) claims to be the future of Node.js Web Frameworks.

This framework is used in production by NPM, Netflix, Pinteres and Napster.

## Code example

Setting up a restify server is just as simple as this

```js
const restify = require('restify');

function respond(req, res, next) {
  res.send('hello ' + req.params.name);
  next();
}

const server = restify.createServer();
server.get('/hello/:name', respond);
server.head('/hello/:name', respond);

server.listen(8080, function() {
  console.log('%s listening at %s', server.name, server.url);
});
```

<a name="next"> </a>

# 4. Nest.js

A relatively new node.js framework, [Nest.js](https://nestjs.com) is caracterized bt

## Example

```js
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setViewEngine('hbs');
  await app.listen(3000);
}
bootstrap();
```


<a name="hapi"> </a>

# 3. Hapi

One of the big 3 node.js frameworks, [hapi.js](https://hapi.dev) has an ecosystem of libraries and plugins that makes the framework highly customizable.

Altought I never used hapi.js on production, I've been using it's validation library Joi.js for years.

## Creating a server

A hapi.js web server looks like this 

```js
const Hapi = require('@hapi/hapi');

const init = async () => {

  const server = Hapi.server({
      port: 3000,
      host: 'localhost'
  });

  await server.start();
  console.log('Server running on %s', server.info.uri);
};

init();
```

<a name="koa"> </a>

# 2. Koa

[Koa](https://koajs.com) is a web framework designed by the team behind Express.js the most famous and used node.js framework.

Koa aims to be a smaller, more expressive, and more robust foundation for web applications and APIs than express.js. 

Through leveraging generators Koa allows you to ditch callbacks and greatly increase error-handling. 

Koa does not bundle any middleware within core, and provides an elegant suite of methods that make writing servers fast and enjoyable.

## Example

```js
const Koa = require('koa'); 
const app = new Koa(); 
app.use(async ctx => { 
  ctx.body = 'Hello World'; 
}); 
app.listen(3000);
```

<a name="express"> </a>

# 1. Express

[Express.js](https://expressjs.com) is definitively the king of node.js frameworks, will reach the incredible mark of 2 millon daily downloads by the end of 2019.

Despite being such an old framework, Express.js is actively mantain by the community, and is used by big companies such as User, Mulesoft, IBM, and so on.

## Example

Just add it to your node.js project

`$ npm install express`

Then declare some API routes

```js
const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

```

And that's all you need to start using it!

<cta-container type="hire" copy="node" ></cta-container>

<a name="conclusion"> </a>

# Conclusion

There are tons of node.js frameworks out there, the best you can do is go and try them all 'til you find the ones that suits your needs.

Personally, I prefer Express.js because through this 6 years of node.js development, I build a strong knoleadge on good architectural patterns, all based on trial and error.

But that doesn't mean you have to do the same, here is [all the secrets of a good express.js framework project.](/ideal-nodejs-project-structure/)

## Now tell me, what is your favorite node.js framework?

Send me a tweet to @santypk4, come on! I want to know what the people are using, I don't want to fall behind! 

