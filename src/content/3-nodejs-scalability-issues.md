---
layout: post
title: "3 node.js scalability issues and how to solve them"
author: santypk4
date: "2011-03-21T08:00:00.000Z"
image: img/node-scalability.jpg
subtitle: "hello"
tags: ["Node.js", "Best"]
twittertags: ["node", "scalability", "backend", "programming", "devops", "javascript"]
draft: true
---

# Table of contents
 - [Serving static assets with express](#intro)
 - [Conclusion](#conclusion)

# Static assets served by express

  Express and node.js weren't designed to server static assets, for those you should be using a CDN like CloudFront. 

  I belive the root of the problem comes from the amount of boostrap or starters that provides a "full-stack" solution for building an MVP, but when your product and userbase grows, you will face a problem, your servers will use too many cpu time.

  The first time I face this issue was when I was working for a company where we start the core product based on the starter angular-boostrap-full-stack that we found on the yeoman registry.

  The first couple of months it worked pretty good, well at least the node.js because we had probles scaling our mongodb database but that's another story...

  Having the server and the client in the same repository, one inside of the other was a problem for us, the front-end team sent too many changes that the backend team didn't care and slow down the backend releases. The same was the other way around.

  I wrote an article on how to implement AWS S3 + AWS Cloudfront for doing this task.

  But also you can use Netlify which is totally free for 100GB network traffic monthly.

<a name="conclusion"></a>

# Conclusion

  We explored just three of the most common scalability issues out there.
  In future articles we will discuss 


# Resources
