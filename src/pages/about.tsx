import IndexLayout from '../layouts';
import Wrapper from '../components/Wrapper';
import styled from '@emotion/styled'
import SiteNav from '../components/header/SiteNav';	
import { SiteHeader, outer, SiteMain, inner } from '../styles/shared';
import * as React from 'react';
import { css } from '@emotion/core';
import { PostFullContent } from '../components/PostContent';

import { NoImage, PostFull } from '../templates/post';
import Footer from '../components/Footer';
import Helmet from 'react-helmet';

const PageTemplate = css`
  .site-main {
    background: #fff;
    padding-bottom: 4vw;
  }
`;

const LandingHeaderContainer = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  padding: 6vw 3vw 3vw;
  width: 100%;
  text-align: center;
  background: #0a0b0c;
  font-family: Lato, sans-serif;
  color: #fff;
  padding: 0 76px 0 76px;
`;

const LandingTitle = styled.h1`
  margin: 0;
  font-size: 48px;
  font-weight: 900;
  margin-bottom: 71px;
`;

const LandingSubHeader = styled.p`
  max-width: 630px;
  text-align: center;
  font-size: 24px;
  margin: -36px 141px 44px 141px;
`

const LandingCallToAction = styled.button`
  background: #f80;
  padding: 16px 32px;
  margin: 0 0 5px;
  border-radius: 3px;
  font-size: 18px;
  font-weight: 600;
  max-width: 100%;
`
const Row = styled.div`
  width: 100%;
`


const About: React.FunctionComponent = () => (
  <IndexLayout>
    <Helmet>
      <title>How to scale your node.js application to 100k users and beyond</title>
    </Helmet>
    <Wrapper css={PageTemplate}>
      <header css={[outer, SiteHeader]}>
        <div css={inner}>	        
          <SiteNav />	          
        </div>
      </header>
      <div css={inner}> 
        <main id="site-main" className="site-main" css={[SiteMain]}>
          <article className="post page" css={[PostFull, NoImage]}>
          <LandingHeaderContainer>
            <LandingTitle>Want to scale your node.js application to 100k users and beyond ?</LandingTitle>
              <LandingSubHeader>If you are in search on of an expert in node.js and javascript technologies with a proven track of producing top-quality applications, and AWS DevOps expertise, you’re in the right place.
            </LandingSubHeader>
            <LandingCallToAction> Get in touch to discuss your needs now! </LandingCallToAction>
          </LandingHeaderContainer>
          <PostFullContent className="post-full-content">
            <div>
              I can help you scale out your node.js server, your react web application, or your react native mobile app,
              by providing the best practices available to architecture your project, or to save time and money by adding continuous integration, 
              and also improve your S3 upload performance.
            </div> 
            <h2> Top Code Quality </h2>
            <div>
              I only make top-quality code, you can see my guide of a <a> bulletproof node.js architecture.</a> 
              <br />
              In order to create a top quality application, I only use the best tech stack out there: node.js, MongoDB, and react.js.
              <br />
              Also, I'm a certified AWS DevOps, I will take care of how your app is deployed to Amazon Web Services (AWS).
            </div>
            <h2> I only work on your project </h2>
            <div> 
              In order to maintain a work/life balance, and to be able to continue learning new skills, I only work with one project at the time.
              <br />
              And just me, no unknown developers in the shadows.
            </div>
            <h2> My previous work </h2>
            <ul> 
              <li>
              <b> FullStack Developer and DevOps at <a href="https://standups.io" rel="nofollow noreferrer" >Standups.io: </a></b>
              <br/>
                I developed the server side of the applications, and mantain the web and mobile projects.
              </li>
            <li> 
              <b> Software Architect at <a href="https://whyline.com" rel="nofollow noreferrer" >Whyline.com: </a></b>
                <br />
              From the first line of code to the multiple microservices, I worked at whyline as a software architect of the mobile application, backend services, and API integrations.
            </li>
            <li> 
              <b> FullStack Developer and DevOps at <a href="https://drinkko.com" rel="nofollow noreferrer" >Drinkko.com: </a> </b>
                <br />
              I created the first version of Drinkko, a location based mobile application that help their customers finding the best deal for drinks.
            </li>
            </ul>
            <h2> Work metodology  </h2>
            <div>
              I'm based in Europe, timezone CET, and work from 9:30 to 17:30, local time.
              <br />
              I only accept remote jobs, but if you happen to be nearby we can arrange a personal meeting.
              <br />
              I use <a href="https://toggl.com/"> Toggl </a> to keep track of the time I work so I wouldn't charge you more.

              <br/>
              The payments are in <b>USD</b> or <b>EUR</b> and only bank transfers are accepted. 
              <br />
              <i> I don't use Payoneer, Skrill, Paypal, Stripe, etc. </i>
              <br />
              I do have a registered software company (LLC) with a proper tax number, and I will generate you an invoice for my services.
              <br />

              We both sign a contract of <a href="https://en.wikipedia.org/wiki/Non-disclosure_agreement"> non disclosure agreement (NDA) </a> and a <a href="https://en.wikipedia.org/wiki/Statement_of_work"> statment of work (SOW)</a>.
              <br/>
              And usually, we do a call once a week, where I showcase my progress on the project and deliver the updates.
              <br />
              Finally, when we finish our contract, the source code, with proper documentation, will be sent to you in a private <a href="https://github.com"> GitHub </a>repository.
              <br />
            </div>
          </PostFullContent>
          </article>
        </main>
      </div>
      <Footer />
    </Wrapper>
  </IndexLayout>
);

export default About;
