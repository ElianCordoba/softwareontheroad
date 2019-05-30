---
layout: post
title: "You don't need passport.js - Complete guide to node.js authentication"
author: santypk4
date: "2019-05-10T20:00:00.000Z"
image: img/passport.jpg
subtitle: "How to master authentication in nodejs without external libraries"
tags: ["Node.js"]
twittertags: ["node", "javascript", "100daysofcode", "code", "webdev"]
draft: false
---

# Introduction

Most developers just clone the boilerpate with login and signup already solved but never take the time to really understand how it works.

And when requirements change, the needing to implement custom logic on login comes up, but if you don't proceed with caution you can make a mistake that will cost you a lot.

The authentication of your users must be threated like a sacred thing. Avoid messing up with passwords on production.

# Table of contents

  - [Conclusion 🏗️](#conclusion)
  - [Example repository](https://github.com/santiq/bulletproof-nodejs)

# The rise and fall of passport.js :emoji-chart-down:

Don't get me wrong, i think passport.js is a great library that servers it's porpuse of helping developers accomplish any kind of login in time.

The objective of this guide is to pay the technical debts of usin passport.js without knowing what's under its abstraction.

# Implementation 

To implement a login you only need a database where you store the email and password of the user, and a type of encryptation for the password.

_At the time of writting, I consider that Argon2 is the best cryptographic algorithm out there, please don't use a simple cryptographic algorithm like SHA256, SHA512 or MD5_


## How to create a Sign Up

When a user is created, the password has to be hashed and stored in the database alongside the email and other custom details (user profile, timestamp, etc)

Notice that we also create a _salt_ for the password. A salt is random data that is used as an additional input to the hashing function, also the salt is randomly generated for every new user record.

```javascript
import * as argon2 from 'argon2';

class AuthService {
  public async SignUp(email, password, name): Promise<any> {
    const salt = randomBytes(32);
    const passwordHashed = await argon2.hash(password, { salt });

    const userRecord = await UserModel.create({
      password: passwordHashed,
      email,
      salt: salt.toString('hex'), // notice the .toString('hex')
      name,
    });
    return {
      // MAKE SURE TO NEVER SEND BACK THE PASSWORD OR SALT!!!!
      user: {
        email: userRecord.email,
        name: userRecord.name,
      },
    }
  }
}
```

The user record looks like this

![User record - Database MongoDB](/img/passport/1-store_secure_password.png)
_Robo3T for MongoDB_

## How to create a Sign In

When user perfoms a sign in, the server checks if the user exists, if the password is valid, and emit a JSON Web Token or JWT, this is the temporaly credential that is going to be used in every request that needs an auntenticated user.

The password verification should be perform using the argon2 library to prevent 'timming based attacks', that is when an attacker try to brute-force a password based in the solid principle of how much time takes the server to respond.

```javascript
import * as argon2 from 'argon2';

class AuthService {
  public async Login(email, password): Promise<any> {
    const userRecord = await UserModel.findOne({ email });
    if (!userRecord) {
      throw new Error('User not found')
    } else {
      const correctPassword = await argon2.verify(userRecord.password, password);
      if (!correctPassword) {
        throw new Error('Incorrect password')
      }
    }

    return {
      user: {
        email: userRecord.email,
        name: userRecord.name,
      },
      token: this.generateJWT(userRecord),
    }
  }
}
```

In the next section we will discuss how to generate a JWT


# But, what is a JWT anyway ? : 

A JSON Web Token or JWT is an encoded JSON object, in a string or Token.

You can think it as a replacement of a cookie, with several adventajes.

The token has 3 parts and looks like this:

![JSON Web Token example](/img/passport/2-jwt_example.png)

The data of the jwt can be decoded in the client side without the **Secret** or **Signature**. This can be useful to transport information or metadata, encoded inside the token, to be used in the frontend application, such as things like the user role, profile, token expiration, and so on.

![JSON Web Token decoded example](/img/passport/3-jwt_decoded.png)


# How to generate JWT in node.js

Let's implement the generateToken function needed to complete our auth service

By using the library `` that you can find in npmjs.com we are able to generate a JWT.
```javascript
import * as jwt from 'jsonwebtoken'
class AuthService {
  private generateToken(user) {

    const data =  {
      _id: user._id,
      name: user.name,
      email: user.email
    };
    const signature = 'MySuP3R_z3kr3t';
    const expiration = '6h';

    return jwt.sign({ data, }, signature, { expiresIn: expiration });
  }
}
```

What is important here is the data encoded, you should never send sensitive information about the user.

The signature is the 'secret' that is used to generate the JWT, is very important to keep this signature safe, if it gets compromised an attacker could generate tokens on behalf the users and steal their sessions.


## Securing endpoints and verifying the JWT

The frontend code is now required to send the JWT in every request to a secure endpoint.

A good practice is includ the JWT in a header, commonly the Authorization header.

![Authorization Header](/img/passport/4-authorization_header.png)


Now in backend, a middleware for the express routes has to be created.

_Middleware "isAuth"_
```javascript
import jwt from 'express-jwt'

const getTokenFromHeader = (req, res) => {}

export default jwt({

})
```

Also, is very useful to have a middleware to get the complete user record, from the database, and add it to the current request.


```javascript
export default (req, res, next) => {
 const decodedTokenData = req.tokenData;
 const userRecord = await UserModel.findOne({ _id: decodedTokenData._id })

  req.currentUser = userRecord;

 if(!userRecord) {
   return res.status(401).end('User not found')
 } else {
   return next();
 }
}
```

Now the routes can access the current user who is performing the request


```javascript
  import isAuth from '../middlewares/isAuth';
  import attachCurrentUser from '../middlewares/attachCurrentUser';
  import ItemsModel from '../models/items';

  export default (app) => {
    app.get('/inventory/personal-items', isAuth, attachCurrentUser, (req, res) => {
      const user = req.currentUser;

      const userItems = await ItemsModel.find({ owner: user._id });

      return res.json(userItems).status(200);
    })
  }
```
The route 'inventory/personal-items' is now secured, you need to have a valid JWT to access it, but also it will use the current user from that JWT to look up in the database for the corresponding items.

## Why a JWT is secured

A common question that you may have after reading this is: 

***If the JWT data can be decoded in the clientsite, can a JWT be manipulated in a way to change the user id or other data ?***

While you can decoded a JWT easily, you can not encode it with new data without having the 'Secret' that was used when the JWT was signed.

This is way is so important to never disclosure the secret.

Our server is checking the signature on the middleware `IsAuth` the library `express-jwt` takes care of that.

Now that we understand how a JWT works, let's move on to a cool advance feature.

## How to impersonate a user or How to login as a specific user

Is a very common requirement to have the possibility to use the system as a specific user, but, how can you login as a user without knowing his password?

There is no need in having the user password to use the application on his behalf, just generate a JWT with the correct signature and the required user metadata.

Let's create an endpoint that can generate a JWT to login as a specific user, this endpoint will only be able to be used by a super-admin user


First we need to stablish a higher role for the superadmin user, there are many ways to do it, a simple one is just to add a 'role' property on the user record in the database.

![super admin role in user database record](/img/passport/5-superadmin_role.png)

Second, let's create a new middleware that checks the user role.

```js
export default (requiredRole) => {
  return (req, res, next) => {
    if(req.currentUser.role === requiredRole) {
      return next();
    } else {
      return res.status(401).send('Action not allowed');
    }
  }
}
```
That middleware needs to be placed after the `isAuth` and `attachCurrentUser` middlewares.

Third, the endpoint that generates a JWT for the user to impersonate.

```javascript
  import isAuth from '../middlewares/isAuth';
  import attachCurrentUser from '../middlewares/attachCurrentUser';
  import roleRequired from '../middlwares/roleRequired';
  import UserModel from '../models/user';

  export default (app) => {
    app.post('/auth/signin-as-user', isAuth, attachCurrentUser, roleRequired('super-admin'), (req, res) => {
      const userEmail = req.body.email;

      const userRecord = await UserModel.findOne({ email });

      if(!userRecord) {
        return res.status(404).send('User not found');
      }

      return res.json({
        user: {
          email: userRecord.email,
          name: userRecord.name
        },
        jwt: this.generateToken(userRecord)
      })
      .status(200);
    })
  }
```

So, there is no black magic here, the super-admin knows the email of the user that wants to impersonate, and the logic is pretty similar to the singin, but there is no check for correct password.

That's because the password is not needed, the security of the endpoint comes from the roleRequired middleware.





<a name="conclusion"></a>

# Conclusion

  

# [See the example repository here](https://github.com/santiq/bulletproof-nodejs)