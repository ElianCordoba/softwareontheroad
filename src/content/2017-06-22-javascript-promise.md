---
layout: post
title: Convert your callback functions to javascript promise
subtitle: Get rid of those annoying callbacks functions with this simple utility
author: santypk4
date: "2017-06-22T15:00:00.000Z"
image: img/callback-hell.jpg
tags: ["javascript", "node.js"]
draft: false
---

# But what is Javascript Promise object and why you need to use it?

If you abuse of callback, you will fall in an anti-pattern, "callback hell" seen in code of programmers who are not wise in the ways of asynchronous programming.

```javascript
getUser(userId, function(err, user){
   getProduct(productId, function(err, product){
      createOrder(user, product, function(err, order){
                ...// Welcome to callback hell
       });
    });
});
```

# The promise approach
```javascript
getUser(userId)
 .then(user => {
   return getProduct(user)
     .then(product => {
       return createOrder(user, wallet, product)
   })
 })
.catch(err => { 
  console.log('Woops!') 
})
```

By using the following code snippet, you will be able to use javascript promise with callback style functions.

You don't need any external library, in fact, you only need 13 lines of code.

```javascript
// Needs spread operator (... notation)
const promisify = (fn) => {
  return (...args) => {
    return new Promise((resolve, reject)=>{
      fn(...args, function(err, res){
        if(err){
          return reject(err);
        }
        return resolve(res);
      })
    })
  }
}
```

```javascript
// Polified version
"use strict";
var promisify = function promisify(fn) {
  return function () {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return new Promise(function (resolve, reject) {
      fn.apply(undefined, args.concat([function (err, res) {
        if (err) {
          return reject(err);
        }
        return resolve(res);
      }]));
    });
  };
}; 
```

Now go and "promisify" all your javascript callback functions