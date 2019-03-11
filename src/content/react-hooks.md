---
layout: post
title: "React Hooks: everything you need to know!"
author: santypk4
date: "2019-03-10T15:00:00.000Z"
image: img/react-hooks.jpg
tags: ["React", "Best"]
twittertags: ["react", "react-native", "hooks", "functional-progamming", "fp", "javascript"]
draft: true
---
  Starting of React `16.8.0` there are new ways to call async code in an elegant way, reuse logic between components much more easily.
  <!-- end -->
  And **improve your testing experience** by moving away logic from stateful components.
  
  All right this is gonna be a **long post**, so I added a table of content so you can read a little, then continue working on your project, and come back when you need a break.

  _I'm the only one who reads technical articles to clean my mind and release stress from my day-to-day work ?_

# Table of contents

 - [What are react hooks anyway?](#intro)
 - [React Hook vs React Class](#classes-vs-hooks)
 - [The existing react hooks](#existing-hooks)
 - [Notation](#notation)
 - [Separation of concerns](#separation-concerns)
 - [Tests for your hooks](#testing)
 - [Advance use cases](#advance)
 - [Real world examples](#real-world)
    - [Show online status](#online-status)
    - [Track geolocation](#geo-location)
 - [Awesome resources](#awesome)
 - [Conclusion](#conclusion)

 <a name="intro"></a>

# What are react hooks anyway?

  When you work with React class components you can use state, that's why these components are also called stateful, also every class component have lifecycle methods like: `componentDidMount()`, `componentDidUpdate()`, and so on.

  You can't use any of this in functional components.
  Functional components can’t use their own state and don’t have lifecycle methods.

  **Now with React hooks you can.**

  React hooks allows us to take a React functional component and add state and lifecycle methods to it.

  In simple words, react hooks are **special functions** to extend the capabilities of functional components and give them the posibility to have **lifecycle events** and **manage state.**

<a name="classes-vs-hooks"></a>

  Let's compare how a class differ from a functional component when react hooks are used.

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
  _Example using `useState` hook to store state in a function component_

  **Fewer lines of code to do the same thing!**

  But is not just that, with React hooks **you can now reuse stateful logic** and have a **better separation of concerns**.

  At first, this new API may appear weird to you but stay with me, you will learn how to get the most out of it.

# The existing react hooks

  The new API comes with two main pre-existing hooks, and some others for other use cases

### Basics react hooks

  The foundation of all react hooks, every other hook you will see is a variation of these three or are using them as primitives.

  - The `useState` is the _State hook_ use it for declaring the state in your components

  - The `useEffect` is the _Side effects hook_ use it for data fetching, manually changing the DOM, and etc.

  - The `useContext` use it in conjunction with React Context API. When the React Context provider updates, this hook will trigger render with the latest context value.

### Advance react hooks

  These are the most important of the other built-in react hooks that comes with the library.

  - The `useReducer` is an alternative to `useState`, you should use it when you have complex state logic, if you’re familiar with Redux you will like it.

  - The `useRef` use it for accessing a DOM element with a mutable ref object. Is more useful than the `ref` attribute


<a name="notation"></a>

## Those peculiar brackets

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

<a name="separation-concerns"> </a>

### Rules

 - Never call Hooks from inside a loop, condition or nested function

 - Never call a Hook from a regular function

 - Only call them inside functions components or custom hooks

 - Hooks should sit at the top level of your component

 - Hooks can call other Hooks

# The `useEffect` hook

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

  This lets us keep the logic for adding and removing subscriptions close to each other. 

# The `useReducer` hook
  When you have complex state logic, it's a good idea to use a `reducer`. If you are familiar with libraries like `Redux` or the `flux pattern` you will understand this at the first glance.

  ![Redux pattern architecture](/img/react-hooks/redux-pattern.png)

  Basically with a reducer you `dispatch` or trigger some actions in your view, those events are listened by a reducer who has the logic inside to update the store which is where your state lives. Now when the store is updated, your component will rerender.


```javascript

import React, { useReducer, useState } from 'react';
import produce from 'immer';

function reducer(state, action) {
  switch (action.type) {
    case 'toggle':
      return produce(state, (draftState) => {
        draftState[action.payload].isCompleted = !draftState[action.payload].isCompleted;
      });
    case 'add':
      return produce(state, (draftState) => {
        draftState.push({ label: action.payload });
      });
    default:
      return state;
  }
}

function Todo({ isCompleted, label, onChange }) {
  return <p>
    <label style={{
      textDecoration: isCompleted && 'line-through'
    }}>
      <input
        type="checkbox"
        checked={isCompleted || false}
        onChange={onChange}
      />
      <span>{label}</span>
    </label>
  </p>
}

function TodoList() {
  const todos = [
    { label: 'Do something' },
    { label: 'Buy dinner' }
  ];

  const [state, dispatch] = useReducer(reducer, todos);
  const [newTodo, setNewTodo] = useState('');

  return <>
    {state.map((todo, i) => (
      <Todo
        key={i}
        {...todo}
        onChange={() => dispatch({ type: 'toggle', payload: i })}
      />
    ))}
    <input
      type="text"
      value={newTodo}
      onChange={(e) => setNewTodo(e.target.value)}
    />
    <button onClick={() => {
      dispatch({ type: 'add', payload: newTodo });
      setNewTodo('');
    }}>
      Add
    </button>
  </>;
}

export default TodoList;
```


# The `useRef` hook
  **Refs** are used to access React elements or DOM elements rendered in the **render** function.
  The hook `useRef` returns a mutable ref object whose `.current` property is initialized to the passed argument `initialValue`.
  It's very simply to use

  ```javascript
  function TextInputWithFocusButton() {
    const inputEl = useRef(null);
    const onButtonClick = () => {
      // `current` points to the mounted text input element
      inputEl.current.focus();
    };
    return (
      <>
        <input ref={inputEl} type="text" />
        <button onClick={onButtonClick}>Focus the input</button>
      </>
    );
  }
  ```

<a name="testing"> </a>

# Separation of concerns

![Mantain your code organized](/img/react-hooks/organized.jpeg)

  With Hooks, you can **extract stateful logic** from a component so it **can be tested independently and reused**. 

  Hooks allow you to reuse stateful logic without changing your component hierarchy.

  Example, components might perform some data fetching in `componentDidMount` and `componentDidUpdate`. 

  However, the same `componentDidMount` method **might also contain unrelated logic** that sets up event listeners, with cleanup performed in `componentWillUnmount`. 

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

## Better way to test stateful logic

  ![Divide and conquer](/img/react-hooks/divide.jpg)

  Now you may have noticed that **hooks are just functions**, and functions can be **unit tested easily**.

  In the next example we will be using jest to do unit testing.

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

<a name="advance"> </a>

# Advance use cases

  ![Like a boss](/img/react-hooks/professional.jpg)

  ## Using `useEffect` for data fetching

  ```javascript
    ...example using axios

  ```

  ```javascript

    ...example using an abstraction layer
  ```

<a name="real-world"></a>

# Real-World examples

  <a name="online-status"></a>

  ## Show online status 
  Detect user's device online status.
  _[(credits to mathdroid)](https://github.com/rehooks/online-status)_

  ### Hook implementation 

  ```javascript
  import { useEffect, useState } from "react";

  function getOnlineStatus() {
    return typeof navigator !== "undefined" &&
      typeof navigator.onLine === "boolean"
      ? navigator.onLine
      : true;
  }

  export const useOnlineStatus = () => {
    let [onlineStatus, setOnlineStatus] = useState(getOnlineStatus());
    const goOnline = () => setOnlineStatus(true);
    const goOffline = () => setOnlineStatus(false);

    useEffect(() => {
      window.addEventListener("online", goOnline);
      window.addEventListener("offline", goOffline);
      return () => {
        window.removeEventListener("online", goOnline);
        window.removeEventListener("offline", goOffline);
      };
    }, []);

    return onlineStatus;
  }
  ```

  ### Hook Usage

  ```javascript
  const App = () => {
    let onlineStatus = useOnlineStatus();
    return (
      <div>
        <h1>You are {onlineStatus ? "Online" : "Offline"}</h1>
      </div>
    );
  }
  ```

  <a name="geo-location"></a>

  ## Detect geolocation changes
  Tracks geolocation state of user's device.
  _[(credits to streamich)](https://github.com/streamich/react-use)_
  ### Hook implementation 
  ```javascript
  import {useState, useEffect} from 'react';
  const useGeolocation = () => {
  const [state, setState] = useState({
    loading: true,
    accuracy: null,
    altitude: null,
    altitudeAccuracy: null,
    heading: null,
    latitude: null,
    longitude: null,
    speed: null,
    timestamp: Date.now(),
  });
  let mounted = true;
  let watchId: any;

  const onEvent = (event: any) => {
    if (mounted) {
      setState({
        loading: false,
        accuracy: event.coords.accuracy,
        altitude: event.coords.altitude,
        altitudeAccuracy: event.coords.altitudeAccuracy,
        heading: event.coords.heading,
        latitude: event.coords.latitude,
        longitude: event.coords.longitude,
        speed: event.coords.speed,
        timestamp: event.timestamp,
      });
    }
  };
  const onEventError = (error: any) =>
    mounted && setState(oldState => ({...oldState, loading: false, error}));

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(onEvent, onEventError);
    watchId = navigator.geolocation.watchPosition(onEvent, onEventError);

    return () => {
      mounted = false;
      navigator.geolocation.clearWatch(watchId);
    };
  }, [0]);

  return state;
};
  ``` 
  ### Hook Usage

  ```javascript
  const Demo = () => {
    const state = useGeolocation();

    return (
      <pre>
        {JSON.stringify(state, null, 2)}
      </pre>
    );
  };
  ```

<a name="awesome"></a>

# Awesome projects

 - [react-use](https://www.npmjs.com/package/react-use) The largest collection of react hooks, really worth checking out.

 - [awesome react hooks](https://github.com/rehooks/awesome-react-hooks) Curated list of awesome resources for learning react hooks.

 - [react-swipeable](https://www.npmjs.com/package/react-swipeable) Provides swipe events for your component.

 - [easy-peasy](https://www.npmjs.com/package/easy-peasy) Global state manager powered by react hooks.

 - [react-intersection-observer](https://www.npmjs.com/package/react-intersection-observer) Tell you when an element enters or leaves the viewport.

 - [UseHooks.com](https://usehooks.com/) Collection of recipies for several react hooks.

<a name="conclusion"></a>

# Wrapping up

  The new React hooks API is a game changer, now we can use state in function components, 
reuse stateful logic, create better test scenarios and write less code.

  We learn about `useState` and `useEffect`, those are the primitives for every hook you will see.

  **Remember, every new hook is a derivation of one of those two.**

  We talk about other react built-in hooks such as `useReducer` and `useRef`.

  We create our own custom hooks to handle data fetching and we implement our own version of `useReducer` to demostrate the magic behind it.

  **Keep it cool and continue learning!**
    

# Resources

 - https://reactjs.org/docs/hooks-intro.html
 - https://stackoverflow.com/questions/53219113/where-can-i-make-api-call-with-hooks-in-react
 - https://www.robinwieruch.de/react-hooks-fetch-data/
 - https://stackoverflow.com/questions/53332321/react-hook-warnings-for-async-function-in-useeffect-useeffect-function-must-ret
 - https://usehooks.com/
 - https://rehooks.com/
 - https://css-tricks.com/intro-to-react-hooks/