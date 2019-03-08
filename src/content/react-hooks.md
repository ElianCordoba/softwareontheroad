---
layout: post
title: What are react hooks anyway ?
author: santypk4
date: "2019-03-10T15:00:00.000Z"
image: img/react-hooks.jpg
tags: ["React", "Best"]
twittertags: ["react", "react-native", "hooks", "functional-progamming", "fp", "javascript"]
draft: true
---

# Let me show you real uses cases for the new React Hooks API
  <!-- end -->
  Starting of React `16.8.0` there are new ways to call async code in an elegant way, reuse logic between components much more easily.
  
  And **improve your testing experience** by moving away logic from stateful components.

# But first, what are react hooks anyway?

  In simple words, react hooks are **special functions** that want to be the **replacement for lifecycle events** that was only available for React Classes.

  ## The good old fashion class-based way

  ```javascript
  import React from 'react';
  class ClickCounter extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        count: 0 // Initial value for our counter
      };
    }

    setCount(numb) {
      this.setState({
        count: numb
      })
    }

    render() {
      return (
        <div>
          <p>You clicked {count} times</p>
          <button onClick={() => this.setCount(this.state.count + 1).bind(this)}>
            Click me
          </button>
        </div>
      );
    }
  }
  ```
  ## With react hooks
  ```javascript
  import React, { useState } from 'react';
  function ClickCounter() {
    /** 
      useState creates a "count" variable that will store the state and a "setCount" function that will mute the "count" variable state.
    **/
    const [count, setCount] = useState(0);

    return (
      <div>
        <p>You clicked {count} times</p>
        <button onClick={() => setCount(count + 1)}>
          Click me
        </button>
      </div>
    );
  }
  ```
  _example using `useState` hook to store state in a function component_

  ** Fewer lines of code to do the same thing!**

  But is not just that, with React hooks **you can now reuse stateful logic** and have a **better separation of concerns**.

  At first, this new API may appear weird to you but stay with me, you will learn how to get the most out of it.

## The existing hooks

  The new API comes with two main pre-existing hooks, and some others for other use cases


  - The `useState` is the _State hook_ use it for declaring the state in your components

  - The `useEffect` is the _Side effects hook_ use it for data fetching, manually changing the DOM, and etc.


# Those peculiar brackets

  You might be asking what the syntax `const [age, setAge] = useState(24)` means, 
  but is just the new way to destructuring an array, let me show you another way to do it.

  ```javascript
  const ageStateVariable = useState(24); // Returns a tuple or an array of length 2
  const age = ageStateVariable[0]; // First item
  const setAge = ageStateVariable[1]; // Second item

  // ES6 way to do this
  const [age, setAge] = useState(24);
  ```

  **I love simple and elegant one-liners**, _not as much as python people, and definitively I do NOT like insane one-liners as python people_ 

# Separation of concerns

  With Hooks, you can **extract stateful logic** from a component so it **can be tested independently and reused**. 

  Hooks allow you to reuse stateful logic without changing your component hierarchy.

  Example, components might perform some data fetching in `componentDidMount` and `componentDidUpdate`. However, the same `componentDidMount` method **might also contain unrelated logic** that sets up event listeners, with cleanup performed in `componentWillUnmount`. 

  Mutually related code that changes together gets split apart, but **completely unrelated code ends up combined in a single method.**

```javascript
  import React from 'react';
  import PlacesAPI from '../services/place';
  class PlaceNewsWithCounter extends React.Component {
    constructor(props) {
      super(props);
      this.handlePlacesNews = this.handlePlacesNews.bind(this);
      this.state = { count: 0, currentEvent: null };
    }

    // Unrelated stateful logic
    componentDidMount() {
      document.title = `You clicked ${this.state.count} times`;
      PlacesAPI.subscribeToPlaceNews(
        this.props.place.id,
        this.handlePlacesNews
      );
    }

    componentDidUpdate() {
      document.title = `You clicked ${this.state.count} times`;
    }

    componentWillUnmount() {
      PlacesAPI.unsubscribeFromPlaceNews(
        this.props.place.id,
        this.handlePlacesNews
      );
    }

    handlePlacesNews(place) {
      this.setState({
        currentEvent: place.currentEvent
      });
    }
    ...
  }
```

  ### A better approach using react hooks

```javascript
  import React, { useState, useEffect } from 'react';
  import PlacesAPI from '../services/place';
  function PlaceNewsWithCounter() {

    // Logic for counter here...
    const [count, setCount] = useState(0);
    useEffect(() => {
      document.title = `You clicked ${count} times`;
    });


    // Logic for place API here...
    const [currentEvent, setCurrentEvent] = useState(null);

    function handlePlacesNews(place) {
      setCurrentEvent(place.currentEvent);
    }

    useEffect(() => {
      PlacesAPI.subscribeToPlaceNews(props.place.id, handlePlacesNews);

      // Why returning a new function? See next section
      return () => {
        PlacesAPI.unsubscribeFromPlaceNews(props.place.id, handlePlacesNews);
      };
    });


    return ...;
  }
```

# The `useEffect` hook

  ## The subscribe and unsubscribe 

  In a React class, you would typically set up a subscription in `componentDidMount`, and clean it up in `componentWillUnmount`.
  With react hook `useEffect` we perform this by returning a function to clean up or _unsubscribe_ the effect.
  If you have worked with `mobx` this pattern may result familiar to you, it's an analogy to a reaction.

```javascript
  useEffect(() => {
    PlacesAPI.subscribeToPlaceNews(props.place.id, handlePlacesNews);
    return () => {
      PlacesAPI.unsubscribeFromPlaceNews(props.place.id, handlePlacesNews);
    };
  });
```

  ### Why did we return a function from our effect? 
  This is the optional cleanup mechanism for effects. Every effect may return a function that cleans up after it. 
  This lets us keep the logic for adding and removing subscriptions close to each other. They’re part of the same effect!

# Better way to testing logic

  ## Dived and conquer

  Now you may have noticed that hooks are just functions!! And functions can be unit tested easily.

```javascript
import PlacesAPI from '../services/place';
export function usePlaceNews(placeId) {
  const [currentEvent, setCurrentEvent] = useState(null);

  function handlePlacesNews(place) {
    setCurrentEvent(place.currentEvent);
  }

  useEffect(() => {
    PlacesAPI.subscribeToPlaceNews(placeId, handlePlacesNews);

    // Why returning a new function? See next section
    return () => {
      PlacesAPI.unsubscribeFromPlaceNews(placeId, handlePlacesNews);
    };
  });
  return currentEvent;
}
```

```javascript
import { usePlaceNews } from '../hooks/place';

function PlacesNews(props) {
  const currentEvent = usePlaceNews(props.place.id);

  return <div> {` The current place event is ${currentEvent} `} </div>
}
```
  Now that looks very similar to a `mobx` observable or a subscription from `Rx`.

# Tips and tricks

 - Don't use them inside loops, conditions, or nested function

 - Only call them inside functions components or custom hooks

# Advance use cases

  ## Using `useEffect` for data fetching

  ```javascript
    ...example using axios

  ```

  ```javascript

    ...example using an abstraction layer
  ```

# Conclusion

  The new React hooks API is a game changer, now we can use state in function components, 
  reuse stateful logic, create better test scenarios and write less code.

# Resources

 - https://reactjs.org/docs/hooks-intro.html
 - https://stackoverflow.com/questions/53219113/where-can-i-make-api-call-with-hooks-in-react
 - https://www.robinwieruch.de/react-hooks-fetch-data/
 - https://stackoverflow.com/questions/53332321/react-hook-warnings-for-async-function-in-useeffect-useeffect-function-must-ret
 - https://usehooks.com/
 - https://css-tricks.com/intro-to-react-hooks/