import * as React from 'react';
import { css } from '@emotion/core';
import config from '../website-config';


const CTAStyles = css`
  min-height: 20vh;
  margin: 10vh 0vw;
  padding: 2vh 0vw;
  background-color: #f4f8fb;
  font-family: 'Georgia', sans-serif;
  display: flex;
  flex-direction: column;
  justify-content: center;
  -webkit-box-shadow: 5px 5px 15px -5px rgba(77,73,77,0.7);
  -moz-box-shadow: 5px 5px 15px -5px rgba(77,73,77,0.7);
  box-shadow: 5px 5px 15px -5px rgba(77,73,77,0.7);
  font-size: 18px;
  .emphasis {
    font-weight: 900;
  }
  .cta-element {
    color: black;
    text-align: center;
    padding: 1vh 3vw;
    color: #738a94;
    input {
      padding: 5px;
      min-width: 25vw;
      border-radius: 2px;
    }
    h3 {
      font-family: 'Arial';
      color: #15171A;
      text-transform: uppercase;
    }
    p {
      margin-bottom: 1em;
    }
  }
  .cta-button {
    display: inline-block;
    text-align: center;
    align-items: flex-start;
    min-width: 20vw;
    margin-top: 2vh;
    padding: 2vh 2vw;
    background-color: #15171A;
    color: white;
    border-radius: 3px;
    text-decoration: none;
    box-shadow: none;
    font-weight: bold;
  }
  .cta-button:hover {
    text-decoration: none;
    color: white;
    box-shadow: none;
  }
`

const BookCTA: React.FunctionComponent = () => {
  return <div className="cta-element">
    <h3> Authentication is more than just a Sign-Up 🎭 </h3>
    <p>
      <span className="emphasis">
        Cookies vs JWT, revoking sessions, two-factor authentication, one-time password (OTP), OAuth, social login, validating emails, and more...
      </span> 
      <br/>
      There is so much to talk about authentication that I created a series of books with video tutorials, case studies, repositories, diagrams and more.
    </p>
    <div className="cta-button-container">
      <a href="/book" className="cta-button">Show me!</a>
    </div>
  </div>
}

const HireMeCTA: React.FunctionComponent<CTAProps> = ({ copy }) => {
  const subject = copy === 'react' ? 'react.js' : 'node.js';
  return <div className="cta-element">
      <h3> 🖐️ Need a hand with your {subject} application? </h3>
      <p> 
        <span className="emphasis">Messy code, scalability problems, security issues, feature planning, and architectural advice </span> is just a couple of things that I can help you with.
      </p>
      <div className="cta-button-container">
        <a href="/about" className="cta-button">Learn more</a>
      </div>
    </div>
}

const SubscribeCTA: React.FunctionComponent<CTAProps> = ({ copy }) => {

  const subject = copy === 'react' ? 'react.js' : 'node.js';

  return <div className="cta-element">
    <h3> 👉 GET MORE ADVANCED {subject} DEVELOPMENT ARTICLES </h3>
    <p> <span className="emphasis">Join the other 2,000+ savvy {subject} developers </span> who get article updates.</p>
      <form
        action={config.mailchimpAction}
        method="post"
        id="mc-embedded-subscribe-form"
        name="mc-embedded-subscribe-form"
        target="_blank"
      >
        <div style={{ position: 'absolute', left: '-5000px' }} aria-hidden="true">
          <input type="text" name={config.mailchimpName} tabIndex={-1} />
        </div>
        <input name="EMAIL" type="email" placeholder="Enter your email" required/>
        <div className="cta-button-container">
          <button type="submit" className="cta-button">Yes! I want updates</button>
        </div>
        <i> No Spam</i>🤞<i>. Unsubscribe anytime.</i>
      </form>
    </div>
}


interface CTAProps {
  type?: string;
  copy: string;
}

const CTAContainer: React.FunctionComponent<CTAProps> = ({ type, copy }) => {

  return (
    <div css={CTAStyles} >
      {
        type === 'book' ? <BookCTA />
          : type === 'hire' ? <HireMeCTA copy={copy} />
            : <SubscribeCTA copy={copy} />
      }
    </div>
  );
};

export default CTAContainer;
