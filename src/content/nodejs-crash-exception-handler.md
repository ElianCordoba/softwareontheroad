---
layout: post
title: 1 simple trick to prevent your node.js server from crashing on production
subtitle: A simple line of code that should be on every node.js application
author: santypk4
date: "2018-07-01T00:00:00.000Z"
image: img/nodejs-trick.jpg
tags: ["Node.js", "Javascript"]
twittertags: ["deploy", "production", "nodejs", "javascript", "express"]
draft: false
---


# Have you ever hear about the "uncaughtException" ?
<!-- end -->

The "uncaughtException" event is emitted when an uncaught JavaScript exception bubbles all the way back to the event loop.

```javascript
 
process.on('uncaughtException', (error)  => {
   
    console.log('Oh my god, something terrible happend: ',  error);

    process.exit(1); // exit application 

})
```

We must shutdown our application after handle the error because is not safe to resume normal operation after "uncaughtException" the system becomes corrupted.

# But wait! There is more

The "unhandledRejection" event is emitted whenever a **Promise** is rejected and no error handler is attached to the promise within a turn of the event loop. When programming with **Promises**, exceptions are encapsulated as "rejected promises". Rejections can be caught and handled using `promise.catch()` and are propagated through a **Promise** chain. The "unhandledRejection" event is useful for detecting and keeping track of promises that were rejected whose rejections have not yet been handled.


``` javascript
process.on('unhandledRejection', (error, promise) => {
  console.log(' Oh Lord! We forgot to handle a promise rejection here: ', promise);
  console.log(' The error was: ', error );
});
```

I suggest you to add this handlers at the **beginning of the entry point** of your application.


Happy coding!! 
